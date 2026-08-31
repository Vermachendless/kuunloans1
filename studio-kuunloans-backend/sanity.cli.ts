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
     * Disable auto-updates so the full custom KuunLoans Studio bundle is built and deployed
     */
    autoUpdates: false,
  },
})


