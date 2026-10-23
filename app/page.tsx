import { cookies } from 'next/headers';
import client from '../tina/__generated__/client';
import type { Language } from '../tina/templating/special-fields';
import ClientPage from './[...filename]/client-page';
import { generateItemMetadata } from '../utils/generateCollectionMetadata';

export async function generateMetadata() {
  const language = (await cookies()).get('language')?.value ?? 'en';
  return generateItemMetadata('home', language, 'page');
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const language = cookieStore.get('language')?.value ?? 'en';

  const data = await client.queries.pageAndNavigation({
    relativePath: 'home.mdx',
  });

  return <ClientPage {...data} language={language as Language} />;
}
