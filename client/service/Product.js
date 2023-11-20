import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from '../lib/fetch.js';

let list = [];

export function getList() {
  return list;
}

export async function fetch() {
  list = await getProducts();
  console.log(list);
}

export async function update(data) {
  await updateProduct(data);
}

export async function add(data) {
  await addProduct(data);
}

export async function remove(id) {
  await deleteProduct(id);
}
