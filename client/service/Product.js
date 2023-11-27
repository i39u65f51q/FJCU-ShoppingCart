import * as api from '../api/api.js';

export async function getProducts() {
  const res = await api.getProducts();
  const { success, content } = res;
  if (!success) return [];
  return content;
}

export async function updateProduct(payload) {
  const res = await api.updateProduct(payload);
  const { success } = res;
  if (!success) return false;
  return true;
}

export async function deleteProduct(productId) {
  const res = await api.deleteProduct(productId);
  const { success } = res;
  if (!success) return false;
  return true;
}

export async function addProduct(payload) {
  const res = await api.addProduct(payload);
  const { success } = res;
  if (!success) return false;
  return true;
}
