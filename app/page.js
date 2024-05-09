import Header from '@/components/Header';
import About from '@/sections/About';
import Services from '@/sections/Services';
import Works from '@/sections/Works';
import Contact from '@/sections/Contact';
import Promotions from '@/sections/Promotions';
import pageStyles from '@/styles/page.module.css';
import axios from 'axios';
import { getPromotionsAmount, getPromotionsData } from '@/utils/getPromotions';

export default async function Home() {
  const handleFetchSocialMedias = await axios.get(`${process.env.baseUrl}/api/about`);
  const socialMediasResult = handleFetchSocialMedias.data;

  const handleFetchWorks = await axios.get(`${process.env.baseUrl}/api/works`);
  const worksResult = handleFetchWorks.data;

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
