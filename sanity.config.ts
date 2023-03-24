/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, previewSecretId, projectId } from 'lib/sanity.api'
import { previewDocumentNode } from 'plugins/previewPane'
import { previewStructurePlugin } from 'plugins/previewStructure'
import { productionUrl } from 'plugins/productionUrl'
import { singletonPlugin } from 'plugins/singeton'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import homePageType from 'schemas/pages/home'
import navType from 'schemas/pages/nav'
import pageType from 'schemas/pages/page'
import settingsType from 'schemas/settings'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Blog with Sanity.io'

export default defineConfig({
  basePath: '/studio',
  projectId: projectId ?? "",
  dataset: dataset ?? "",
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [settingsType, homePageType, navType, pageType],
  },
  plugins: [
    deskTool({
      structure: previewStructurePlugin(
        [settingsType, navType],
        [homePageType],
        {
          apiVersion,
          previewSecretId,
        }
      ),
      defaultDocumentNode: previewDocumentNode({ apiVersion, previewSecretId }),
    }),
    // Configures the global "new document" button, and document actions, to
    // suit a singleton
    singletonPlugin({
      type: [settingsType.name, homePageType.name, navType.name],
    }),
    // Add the "Open preview" action
    productionUrl({
      apiVersion,
      previewSecretId,
      types: [homePageType.name, pageType.name],
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
