// app/page.js
import Header from '@/components/Header';
import About from '@/sections/About';
import Services from '@/sections/Services';
import Works from '@/sections/Works';
import Contact from '@/sections/Contact';
import Promotions from '@/sections/Promotions';
import pageStyles from '@/styles/page.module.css';
import { getPromotionsAmount, getPromotionsData } from '@/utils/getPromotions';

async function fetchApi(path) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Fetch failed: ${path}`);
  return res.json();
}

export default async function Home() {
  const [socialMediasResult, worksResult] = await Promise.all([
    fetchApi('/api/about'),
    fetchApi('/api/works'),
  ]);

  const promotionsAmount = getPromotionsAmount();
  const promotionsData = getPromotionsData();

  return (
    <>
      <Header type="home" />
      <main className={pageStyles.main}>
        <About socialMedias={socialMediasResult.data} />
        <Services />
        <Works data={worksResult.data} />
        <Contact />
        {promotionsAmount > 0 ? <Promotions data={promotionsData} /> : null}
      </main>
    </>
  );
}
