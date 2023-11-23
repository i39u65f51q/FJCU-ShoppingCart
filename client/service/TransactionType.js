import * as fetch from '../lib/fetch.js';

export async function getTransactionType() {
  const res = await fetch.getTransactionType();
  const { success, content } = res;
  if (!success) return [];
  return content;
}
