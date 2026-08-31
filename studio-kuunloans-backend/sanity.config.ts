import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {KuunLoansLogo} from './components/KuunLoansLogo'
import {CustomNavbar} from './components/CustomNavbar'
import {kuunloansTheme} from './theme'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'KuunLoans Admin',
  subtitle: 'Financial Operations Portal',
  icon: KuunLoansLogo,
  theme: kuunloansTheme,

  projectId: 'd1cwze7g',
  dataset: 'production',

  auth: {
    redirectOnSingle: false,
    loginMethod: 'dual',
  },

  studio: {
    components: {
      navbar: CustomNavbar,
    },
  },


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



