import type { Template } from 'tinacms';
import ImageTemplate from '../Image/ImageTemplate';
import {
  FlexAlignField,
  FlexDirectionField,
  FlexJustifyField,
  HasBackgroundField,
  MarginBottomField,
  MarginTopField,
} from '../../tina/templating/granular-fields';
import HeadingTemplate from '../Heading/HeadingTemplate';
import TextTemplate from '../Text/TextTemplate';
import ButtonTemplate from '../Button/ButtonTemplate';
import SlideshowTemplate from '../Slideshow/SlideshowTemplate';
import CallToActionTemplate from '../CallToAction/CallToActionTemplate';
import config from '../../utils/config';
import AccordionTemplate from '../Accordion/AccordionTemplate';

const label = {
  flex: {
    en: 'Flex',
    de: 'Flex',
  },
  flexItems: {
    en: 'Flex items',
    de: 'Flex Elemente',

    blocks: {
      en: 'Content',
      de: 'Inhalt',
    },
  },
};

export default {
  name: 'Flex',
  label: label.flex[config.tina.language],
  fields: [
    {
      name: 'settings',
      label: `${label.flex[config.tina.language]} Settings`,
      type: 'object',
      fields: [
        MarginTopField,
        MarginBottomField,
        HasBackgroundField,
        FlexJustifyField,
        FlexAlignField,
        FlexDirectionField,
      ],
    },
    {
      name: 'items',
      label: label.flexItems[config.tina.language],
      type: 'object',
      list: true,
      fields: [
        {
          name: 'blocks',
          label: label.flexItems.blocks[config.tina.language],
          type: 'object',
          list: true,
          templates: [
            AccordionTemplate,
            ButtonTemplate,
            HeadingTemplate,
            ImageTemplate,
            SlideshowTemplate,
            TextTemplate,
            CallToActionTemplate,
          ],
        },
      ],
      ui: {
        itemProps: (item) => {
          return {
            label: `${item.blocks?.[0]?._template} ${
              item.blocks?.length > 1
                ? `and ${item.blocks?.length - 1} more`
                : ''
            }`,
          };
        },
      },
    },
  ],
} as Template;
