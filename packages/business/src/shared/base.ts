import { extractLastNumberFromUrl } from '@repo/services/number/number';

export abstract class Base {
  ensureOrder(order?: number, url?: string) {
    if (order) {
      return order;
    }
    if(!url) {
      return 0;
    }
    return extractLastNumberFromUrl(url);
  }
}