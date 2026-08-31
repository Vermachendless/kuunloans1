import {buildLegacyTheme} from 'sanity'

export const kuunloansTheme = buildLegacyTheme({
  /* Base typography & neutral colors */
  '--black': '#0f172a',
  '--white': '#ffffff',
  '--gray': '#64748b',
  '--gray-base': '#64748b',

  /* Component background & text */
  '--component-bg': '#ffffff',
  '--component-text-color': '#0f172a',

  /* Brand primary & accents */
  '--brand-primary': '#F4C430',

  /* Main navigation bar */
  '--main-navigation-color': '#0f172a',
  '--main-navigation-color--inverted': '#ffffff',

  /* Default buttons */
  '--default-button-color': '#64748b',
  '--default-button-primary-color': '#F4C430',
  '--default-button-success-color': '#22c55e',
  '--default-button-warning-color': '#f59e0b',
  '--default-button-danger-color': '#ef4444',

  /* State indicators */
  '--state-info-color': '#F4C430',
  '--state-success-color': '#22c55e',
  '--state-warning-color': '#f59e0b',
  '--state-danger-color': '#ef4444',

  /* Focus states */
  '--focus-color': '#F4C430',
})
