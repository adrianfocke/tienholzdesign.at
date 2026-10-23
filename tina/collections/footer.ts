import type { Collection } from "tinacms";
import TextTemplate from "../../components/Text/TextTemplate";

export default {
  label: "Bottom Menu",
  name: "footer",
  path: "content/footer",
  format: "json",
  fields: [
    {
      name: "links",
      label: "Links",
      type: "object",
      list: true,
      ui: {
        itemProps: (item, index) => {
          console.log("item", item?.content);
          return {
            label: item?.text_de ?? item?.text_en ?? "Link" + (index + 1),
          };
        },
      },
      fields: TextTemplate.fields,
    },
  ],
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
} as Collection;
