"use client";
import { useTina } from "tinacms/dist/react";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import type { ProjectAndNavConnectionQuery } from "../../tina/__generated__/types";
import type { Language } from "../../tina/templating/special-fields";
import { LanguageContext } from "../../utils/context/language";
import Grid from "../../components/Grid/Grid";

type ClientPageProps = {
  query: string;
  variables: {
    relativePath: string;
  };
  data: ProjectAndNavConnectionQuery;
  language: Language;
};

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const pages = data.projectConnection.edges?.sort(
    (a, b) =>
      new Date(b!.node?._sys.filename!).getTime() -
      new Date(a!.node?._sys.filename!).getTime(),
  );

  return (
    <LanguageContext.Provider value={props.language || "en"}>
      <Navigation {...data.navigation} />
        {pages && <Grid settings={{mt: "6"}} items={pages.map((item) => (
          {
            blocks: [
              {
                __typename: "PageBlocksImageContentBlocksImage",
                content: {
                  image: item?.node?.image,
                  link: "/projects/" + item?.node?._sys.filename,
                },
                settings: {
                  sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
                },
              },
                       {
                __typename: "PageBlocksImageContentBlocksText",
                link: "/projects/" + item?.node?._sys.filename,
                text_de: item?.node?.name,
                text_en: item?.node?.name,
              },
            ],
          }
        )) as any} />
        }
        <Footer {...data.footer} />
    </LanguageContext.Provider>
  );
}
