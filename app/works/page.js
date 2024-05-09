import Header from '@/components/Header';
import WorksList from '@/sections/WorksList';
import pageStyles from '@/styles/page.module.css';
import axios from 'axios';

export default async function Home() {
  const handleFetchWorks = await axios.get(`${process.env.baseUrl}/api/works`);
  const worksResult = handleFetchWorks.data;

  return (
    <>
      <Header type="works" />
      <main className={pageStyles.main}>
        <WorksList data={worksResult.data} />
      </main>
    </>
  );
}
