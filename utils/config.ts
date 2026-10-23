import type { Language } from '../tina/templating/special-fields';

export default {
  project: {
    applicationName: 'Tien Holz Design',
    /** The base URL for the project without the protocol */
    url: 'tienholzdesign.at',
    authors: [
      {
        name: 'Tien Holz',
        url: 'tienholzdesign.at',
      },
    ],
  },
  layout: {
    borderRadius: 'var(--radius-4)',
    padding: '4',
    gap: '5',
    gridColumns: {
      initial: '1',
      md: '3',
    },
    radius: 'full',
    radiusVar: 'var(--radius-0)',
    textSize: {
      initial: '4',
      xs: "4",
      sm: '4',
      md: '4',
      lg: '4',
      xl: '4',
    },
    headingSize: {
      initial: '4',
      xs: "4",
      sm: '4',
      md: '6',
      lg: '6',
      xl: '6',
    },
    boxShadow: 'var(--shadow-3)',
  },
  tina: {
    language: 'de' as Language,
  },
  radixUI: {
    accentColor: 'gray' as const,
    appearance: 'light' as const,
    scaling: '100%',
    panelBackground: 'translucent' as const,
  },
} as const;
