import * as api from '../api/api.js';

export async function getTransactionType() {
  const res = await api.getTransactionType();
  const { success, content } = res;
  if (!success) return [];
  return content;
}
