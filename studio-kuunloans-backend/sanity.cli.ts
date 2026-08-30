import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'd1cwze7g',
    dataset: 'production'
  },
  studioHost: 'kuunloans',
  deployment: {
    appId: 'n8qk0lj1u16wpf15gj6zj39k',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})


