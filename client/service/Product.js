import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from '../lib/fetch.js';
export class ProductService {
  constructor() {
    this.list = [];

    this.init();
  }

  async init() {
    this.list = await getProducts();
  }
}
