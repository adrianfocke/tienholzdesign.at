import type { Template } from 'tinacms';
import {
  AspectRatioField,
  LinkField,
  MarginTopField,
  MarginBottomField,
} from '../../tina/templating/granular-fields';
import { createResponsiveField } from '../../tina/templating/special-fields';
import ButtonTemplate from '../Button/ButtonTemplate';
import CallToActionTemplate from '../CallToAction/CallToActionTemplate';

export default {
  name: 'Image',
  label: 'Image',
  fields: [
    {
      name: 'content',
      label: 'Image',
      type: 'object',
      fields: [
        LinkField,
        {
          name: 'image',
          label: 'Image',
          type: 'image',
        },
        {
          name: 'blurImage',
          label: 'Preload Image',
          type: 'image',
          description:
            'Insert a compressed version of the original image that preloads and prevents white flashes',
        },
        {
          name: 'blocks',
          label: 'Content Blocks',
          type: 'object',
          list: true,
          templates: [
            ButtonTemplate,
            CallToActionTemplate,
          ],
        },
      ],
    },
    {
      name: 'settings',
      label: 'Settings',
      type: 'object',
      fields: [
        MarginTopField,
        MarginBottomField,
        ...createResponsiveField(AspectRatioField),
        {
          name: 'sizes',
          label: 'Image Sizes',
          type: 'string',
          description:
            'Next.js sizes attribute for responsive loading, e.g. (max-width: 768px) 100vw, 1200px',
        },
        {
          name: 'priority',
          label: 'Prioritize Loading',
          type: 'boolean',
          description: 'Enable for above-the-fold images to improve LCP.',
        },
      ],
    },
  ],
} as Template;
