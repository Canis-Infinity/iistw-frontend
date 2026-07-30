import { describe, expect, it } from 'vitest';
import { getPromotionsAmount, getPromotionsData } from '@/utils/getPromotions';

describe('promotions utils', () => {
  it('keeps amount in sync with returned data', () => {
    expect(getPromotionsAmount()).toBe(getPromotionsData().length);
  });
});
