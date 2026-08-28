import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import type {StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// ─── Singleton Desk Structure ────────────────────────────────────────────────
export const structure: StructureResolver = (S) =>
  S.list()
    .title('KuunLoans Content')
    .items([
      // 1. Singleton: Site Settings & Company Info
      S.listItem()
        .title('Site Settings & Company Info')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings & Company Info')
        ),

      S.divider(),

      // 2. All other document types
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'siteSettings'
      ),
    ])

export default defineConfig({
  name: 'default',
  title: 'Kuunloans backend',

  projectId: 'd1cwze7g',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Filter out siteSettings from "Create new document" menu to enforce singleton
    templates: (templates) =>
      templates.filter(({schemaType}) => schemaType !== 'siteSettings'),
  },

  document: {
    // For the singleton siteSettings document, preserve publish and edit actions
    actions: (input, context) =>
      context.schemaType === 'siteSettings'
        ? input.filter(
            ({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action)
          )
        : input,
  },
})
