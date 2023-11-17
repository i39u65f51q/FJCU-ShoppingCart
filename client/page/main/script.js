import * as MemberService from '../../service/Member.js';
import * as OrderService from '../../service/Order.js';
import * as ProductService from '../../service/Product.js';
import { renderManagerHeader, renderUserHeader } from '../../components/header.component.js';
import { cartItems } from '../common.js';

const header = document.querySelector('.header');
const container = document.querySelector('.container');

window.addEventListener('load', async () => {
  renderLoading(); //API Waiting
  await fetchAll();

  /* 判斷是否為使用者或管理者*/
  if (true) {
    renderManagerHeader(header, cartItems.length); //管理員頁面
  } else {
    renderUserHeader(header, cartItems.length); //使用者頁面
  }

  renderMain();
});

function renderLoading() {
  container.innerHTML = `
  <span>載入資料中...</span>
    `;
}

function renderMain() {
  container.innerHTML = `    
      <span>主頁面</span>
    `;
}

async function fetchAll() {
  //   const promises = [MemberService.initialize(), OrderService.initialize(), ProductService.initialize()];
  //   await Promise.all(promises);
}
