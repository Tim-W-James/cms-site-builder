/**
 * This component is responsible for rendering a preview of a post inside the Studio.
 */
import { Card, Flex, Spinner, Text } from '@sanity/ui'
import { pageNames } from 'data/pageNames'
import { getSecret } from 'plugins/productionUrl/utils'
import {
  memo,
  startTransition,
  Suspense,
  useEffect,
  useState,
} from 'react'
import { useClient } from 'sanity'
import { suspend } from 'suspend-react'

type Props = {
  path?: string
  previewSecretId: `${string}.${string}`
  apiVersion: string
}

export default function PostPreviewPane(props: Props) {
  const { previewSecretId, apiVersion } = props
  // Whenever the slug changes, wait 3 seconds for GROQ to reach eventual consistency.
  // This helps to prevent displaying "Invalid slug" or returning 404 errors while editing the slug manually.
  const [path, setPath] = useState(props.path)
  useEffect(() => {
    const timeout = setTimeout(
      () => startTransition(() => setPath(props.path)),
      3000
    )
    return () => clearTimeout(timeout)
  }, [props.path])

  // if the document has no slug for the preview iframe
  if (path && !(pageNames as ReadonlyArray<string>).includes(path)) {
    return (
      <Card tone="primary" margin={5} padding={6}>
        <Text align="center">
          Couldn&apos;t find the page {path} to preview.
        </Text>
      </Card>
    )
  }

  return (
    <Card
      scheme="light"
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <Suspense fallback={null}>
        <Iframe
          apiVersion={apiVersion}
          previewSecretId={previewSecretId}
          path={path}
        />
      </Suspense>
      <Flex
        as={Card}
        justify="center"
        align="center"
        height="fill"
        direction="column"
        gap={4}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <Text muted>Loading…</Text>
        <Spinner muted />
      </Flex>
    </Card>
  )
}

// Used as a cache key that doesn't risk collision or getting affected by other components that might be using `suspend-react`
const fetchSecret = Symbol('preview.secret')
const Iframe = memo(function Iframe(
  props: Omit<Props, 'path'> & Required<Pick<Props, 'path'>>
) {
  const { apiVersion, previewSecretId, path } = props
  const client = useClient({ apiVersion })

  const secret = suspend(
    () => getSecret(client, previewSecretId, true),
    ['getSecret', previewSecretId, fetchSecret],
    // The secret fetch has a TTL of 1 minute, just to check if it's necessary to recreate the secret which has a TTL of 60 minutes
    { lifespan: 60000 }
  )

  const url = new URL('/api/preview', location.origin)
  url.searchParams.set('path', path)
  if (secret) {
    url.searchParams.set('secret', secret)
  }

  return (
    <iframe
      style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
      src={url.toString()}
    />
  )
})
