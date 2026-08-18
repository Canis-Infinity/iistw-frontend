import Header from '@/components/Header';
import WorksList from '@/sections/WorksList';
import { getApiData } from '@/utils/getApiData';

export default async function Home() {
  const worksResult = await getApiData('/api/works');

  return (
    <>
      <Header type="works" />
      <main className="w-full">
        <WorksList data={worksResult.data} />
      </main>
    </>
  );
}
