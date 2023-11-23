import * as fetch from '../lib/fetch.js';

export async function getProducts() {
  const res = await fetch.getProducts();
  const { success, content } = res;
  if (!success) return [];
  return content;
}

export async function updateProduct(payload) {
  const res = await fetch.updateProduct(payload);
  const { success } = res;
  if (!success) return false;
  return true;
}

export async function deleteProduct(productId) {
  const res = await fetch.deleteProduct(productId);
  const { success } = res;
  if (!success) return false;
  return true;
}

export async function addProduct(payload) {
  const res = await fetch.addProduct(payload);
  const { success } = res;
  if (!success) return false;
  return true;
}
