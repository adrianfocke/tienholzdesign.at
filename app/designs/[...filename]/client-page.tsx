'use client';

import { useTina } from 'tinacms/dist/react';
import type { DesignAndNavigationQuery } from '../../../tina/__generated__/types';
import type { Language } from '../../../tina/templating/special-fields';
import { LanguageContext } from '../../../utils/context/language';
import { renderBlocks } from '../../../tina/templating/utils';
import Navigation from '../../../components/Navigation/Navigation';
import Footer from '../../../components/Footer/Footer';

type ClientPageProps = {
  query: string;
  variables: {
    relativePath: string;
  };
  data: DesignAndNavigationQuery;
  language: Language;
};

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <div data-testid="client-page">
      <LanguageContext.Provider value={props.language}>
        <Navigation {...data.navigation} />
        {data.design.blocks?.map((block, i) => renderBlocks(block, i))}
        <Footer {...data.footer} />
      </LanguageContext.Provider>
    </div>
  );
}
