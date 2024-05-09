const promotionsList = [
  // {
  //   id: 'xinghau',
  //   title: {
  //     tw: '星皓商行',
  //     cn: '星皓商行',
  //     en: 'XingHau',
  //   },
  //   content: {
  //     tw: `即日起至蝦皮「☆星皓商行☆」購買商品，於訂單備註輸入「」優惠碼可享XXX。`,
  //     cn: `即日起至蝦皮「☆星皓商行☆」购买商品，于订单备注输入「」优惠码可享XXX。`,
  //     en: `From now on, buy products at Shopee "☆星皓商行☆", enter "XXX" in the order remarks to enjoy XXX.`,
  //   },
  //   link: {
  //     shopee: 'https://shopee.tw/allen09765698',
  //   },
  //   logo: '/image.png',
  // },
  // {
  //   id: 'xinghau',
  //   title: {
  //     tw: '星皓商行',
  //     cn: '星皓商行',
  //     en: 'XingHau',
  //   },
  //   content: {
  //     tw: `即日起至蝦皮「☆星皓商行☆」購買商品，於訂單備註輸入「」優惠碼可享XXX。`,
  //     cn: `即日起至蝦皮「☆星皓商行☆」购买商品，于订单备注输入「」优惠码可享XXX。`,
  //     en: `From now on, buy products at Shopee "☆星皓商行☆", enter "XXX" in the order remarks to enjoy XXX.`,
  //   },
  //   link: {
  //     shopee: 'https://shopee.tw/allen09765698',
  //   },
  //   logo: '/image.png',
  // },
];

export function getPromotionsData(promotionId) {
  if (promotionId) {
    return promotionsList.filter(promotion => promotion.id === promotionId);
  }

  return promotionsList;
}

export function getPromotionsAmount() {
  return promotionsList.length || 0;
}