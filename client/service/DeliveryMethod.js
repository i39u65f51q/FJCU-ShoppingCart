import * as api from '../api/api.js';

export async function getDeliveryMethod() {
  const res = await api.getDeliveryMethod();
  const { success, content } = res;
  if (!success) return [];
  return content;
}
