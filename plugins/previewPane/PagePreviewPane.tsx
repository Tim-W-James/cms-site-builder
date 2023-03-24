/**
 * This component is responsible for rendering a preview of a post inside the Studio.
 */
import { Card, Flex, Spinner, Text } from '@sanity/ui'
import { pageNames } from 'data/pageNames'
import {
  startTransition,
  Suspense,
  useEffect,
  useState
} from 'react'

import Iframe, { Props } from './fetchSecret'

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
          path={path ?? ""}
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


