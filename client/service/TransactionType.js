import { getTransactionType } from '../lib/fetch.js';
let list = [];

export async function fetch() {
  const res = await getTransactionType();
  list = res.content;
}

export function getList() {
  return list;
}
