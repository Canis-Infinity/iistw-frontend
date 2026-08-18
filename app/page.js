// app/page.js
import Header from '@/components/Header';
import About from '@/sections/About';
import Services from '@/sections/Services';
import Works from '@/sections/Works';
import Contact from '@/sections/Contact';
import Promotions from '@/sections/Promotions';
import { getPromotionsAmount, getPromotionsData } from '@/utils/getPromotions';
import { getApiData } from '@/utils/getApiData';

export default async function Home() {
  const [socialMediasResult, worksResult] = await Promise.all([
    getApiData('/api/about'),
    getApiData('/api/works'),
  ]);

  const promotionsAmount = getPromotionsAmount();
  const promotionsData = getPromotionsData();

  return (
    <>
      <Header type="home" />
      <main className="w-full">
        <About socialMedias={socialMediasResult.data} />
        <Services />
        <Works data={worksResult.data} />
        <Contact />
        {promotionsAmount > 0 ? <Promotions data={promotionsData} /> : null}
      </main>
    </>
  );
}
