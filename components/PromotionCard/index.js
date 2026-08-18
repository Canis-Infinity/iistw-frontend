import { useState } from 'react';
import Image from 'next/image';
import Loading from '@/components/Loading';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { SiShopee } from 'react-icons/si';
import { IoLink } from 'react-icons/io5';
import { translations, pickLang } from '@/utils/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function PromotionCard({ lang, title, content, link, logo }) {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Card>
      <CardContent className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
      <div className="flex size-20 items-center justify-center rounded-xl border bg-muted text-primary [&_svg]:size-8">
        {!logo && <RiDiscountPercentFill />}
        {logo && loading && <Loading />}
        {logo && (
          <Image
            src={`${process.env.baseUrl}${logo}`}
            alt={title}
            width={100}
            height={100}
            onLoad={handleImageLoad}
          />
        )}
      </div>
      <div className="grid gap-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{content}</p>
        <div className="flex flex-wrap gap-2">
          {link?.shopee && (
            <Tooltip>
              <TooltipTrigger
                render={(
                  <Button
                    render={<a href={link.shopee} target="_blank" rel="noreferrer" />}
                    size="icon"
                    variant="outline"
                  />
                )}
              >
                <SiShopee />
              </TooltipTrigger>
              <TooltipContent>{pickLang(translations.promotionCard.shopee, lang)}</TooltipContent>
            </Tooltip>
          )}
          {link?.normal && (
            <Tooltip>
              <TooltipTrigger
                render={(
                  <Button
                    render={<a href={link.normal} target="_blank" rel="noreferrer" />}
                    size="icon"
                    variant="outline"
                  />
                )}
              >
                <IoLink />
              </TooltipTrigger>
              <TooltipContent>{pickLang(translations.promotionCard.website, lang)}</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
      </CardContent>
    </Card>
  );
}
