import { HomePage } from '../page/home.js';
import { LoginPage } from '../page/login.js';
import { getToken } from '../lib/localstorage';
import { ProductService } from '../service/Product.js';

/* 確認使用者進入頁面是否有Token */
export class Layout {
  constructor() {
    this.productService = new ProductService();

    this.init();
  }

  init(container) {
    if (!getToken()) {
      new LoginPage().render(container);
    } else {
      new HomePage().render(container);
    }
  }
}
