import * as MemberService from '../../service/Member.js';
import * as OrderService from '../../service/Order.js';
import * as ProductService from '../../service/Product.js';
import { renderUserHeader } from '../../components/header.component.js';
import { cartItems, toLogin, toManager } from '../common.js';
import * as storage from '../../lib/localstorage.js';
import { AUTH_MANAGER, AUTH_USER } from '../../enum/auth.js';

const header = document.querySelector('.header');
const productContainer = document.querySelector('.products-container');
const cartsWrap = document.querySelector('.carts-wrap');

window.addEventListener('load', async () => {
  //沒有驗證身份，返回登入頁
  const auth = storage.getAuth();
  if (!auth) {
    toLogin();
    return;
  } else if (auth === AUTH_MANAGER) {
    toManager();
    return;
  } else if (auth !== AUTH_USER) {
    storage.clearAuth();
    toLogin();
    return;
  }

  header.innerHTML = renderUserHeader();
  await fetchAll(); //取得API資料
  //渲染商品
  ProductService.getList().forEach(product => {
    productContainer.innerHTML += renderProductItem(product);
  });
  //渲染購物車
  const carts = storage.getCarts();
  if (carts && carts.length !== 0) {
    carts.forEach(cart => {
      cartsWrap.innerHTML += renderCartItem(cart);
    });
  }
});
/* 商品資料 */
function renderProductItem(product) {
  const content = `
  <div class="item" style="width: 300px; height: auto; border: 1px solid #eee; border-radius:6px; box-shadow:0px 3px 3px rgba(0,0,0,0.5); overflow:hidden;">
    <div style="display: block; width: 100%; height: 120px; background-color: gold"></div>
    <div style="width: 100%; display: flex; flex-direction: column; padding: 0.5rem">
      <div><span>商品名稱：</span><span class="name">${product.name}</span></div>
      <div><span>商品價格：</span><span class="price">${product.price}</span></div>
      <div><span>剩餘數量：</span><span>${product.quantity}</span></div>
      <div style="display: flex; align-items: center; justify-content: space-between">
        <div style="width: 100%"><span>加到購物車：</span><span class="count">${1}</span></div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.2rem">
          <button class="plus" style="width: 20px">+</button>
          <button class="minus" style="width: 20px">-</button>
          <button class="confirm" style="width: 70px">新增</button>
      </div>
    </div>
  </div>
</div>`;
  return content;
}
/* 購物車項目 */
function renderCartItem(cartItem) {
  const content = `
  <div class="carts-item"
    style="
      width: 100%;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: #eee;
      border-bottom: 1px solid #ddd;
  ">
    <span>商品名稱 : ${cartItem.name}</span><span>數量：${cartItem.counts}</span><span>總價格：${cartItem.total}</span>
    <div style="display: flex; gap: 0.5rem">
      <button class="edit">新增數量</button><button class="delete">減少數量</button>
    </div>
  </div>
  `;

  return content;
}

async function fetchAll() {
  await ProductService.fetch();
}
