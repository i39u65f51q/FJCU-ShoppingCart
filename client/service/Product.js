import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from '../lib/fetch.js';

const list = [];

export async function initialize() {
  list = await getProduct();
}

export function getList() {
  return list;
}
