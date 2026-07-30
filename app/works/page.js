import Header from '@/components/Header';
import WorksList from '@/sections/WorksList';
import pageStyles from '@/styles/page.module.css';
import { getApiData } from '@/utils/getApiData';

export default async function Home() {
  const worksResult = await getApiData('/api/works');

  return (
    <>
      <Header type="works" />
      <main className={pageStyles.main}>
        <WorksList data={worksResult.data} />
      </main>
    </>
  );
}
