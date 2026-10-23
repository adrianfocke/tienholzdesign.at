'use client';

import { useTina } from 'tinacms/dist/react';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import type { DesignAndNavConnectionQuery } from '../../tina/__generated__/types';
import type { Language } from '../../tina/templating/special-fields';
import { LanguageContext } from '../../utils/context/language';
import Grid from '../../components/Grid/Grid';

type ClientPageProps = {
  query: string;
  variables: {
    relativePath: string;
  };
  data: DesignAndNavConnectionQuery;
  language: Language;
};

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const designs = data.designConnection.edges;

  return (
    <LanguageContext.Provider value={props.language || 'en'}>
      <Navigation {...data.navigation} />
      {designs && (
        <Grid
          settings={{ mt: '6' }}
          items={designs.map((item) => ({
            blocks: [
              {
                __typename: 'PageBlocksImageContentBlocksImage',
                content: {
                  image: item?.node?.image,
                  link: `/designs/${item?.node?._sys.filename}`,
                },
                settings: {
                  sizes:
                    '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
                },
              },
              {
                __typename: 'PageBlocksImageContentBlocksText',
                link: `/designs/${item?.node?._sys.filename}`,
                text_de: item?.node?.name,
                text_en: item?.node?.name,
              },
            ],
          })) as any}
        />
      )}
      <Footer {...data.footer} />
    </LanguageContext.Provider>
  );
}
