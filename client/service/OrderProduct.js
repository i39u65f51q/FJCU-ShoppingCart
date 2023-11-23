import * as fetch from '../lib/fetch.js';

//{orderId:number, product:Id}
export async function getOrderProducts() {
  const res = await fetch.getOrderProducts();
  const { success, content } = res;
  if (!success) return [];
  return content;
}

export async function getOrderProduct(orderId) {
  const res = await fetch.getOrderProduct(orderId);
  const { success, content } = res;
  if (!success) return [];
  return content;
}
