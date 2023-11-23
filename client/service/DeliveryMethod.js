import * as fetch from '../lib/fetch.js';

export async function getDeliveryMethod() {
  const res = await fetch.getDeliveryMethod();
  const { success, content } = res;
  if (!success) return [];
  return content;
}
