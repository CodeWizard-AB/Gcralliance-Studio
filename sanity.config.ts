import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {MyLogo} from './components/Logo'

export default defineConfig({
  icon: () => MyLogo(),
  name: 'default',
  title: 'Gcralliance-Studio',
  basePath: '/studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  plugins: [structureTool({structure}), visionTool()],
  schema: {types: schemaTypes},
})
