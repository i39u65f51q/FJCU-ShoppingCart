import { getDeliveryMethod } from '../lib/fetch.js';

let list = [];

export async function fetch() {
  const res = await getDeliveryMethod();
  list = res.content;
}

export function getList() {
  return list;
}
