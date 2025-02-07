import { extractLastNumberFromUrl } from '@repo/services/number/number';

export abstract class Base {
  ensureOrder(order?: number, url?: string) {
    if (order) {
      return order;
    }
    return extractLastNumberFromUrl(url);
  }
}