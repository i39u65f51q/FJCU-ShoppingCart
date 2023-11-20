import * as MemberService from '../../service/Member.js';
import * as OrderService from '../../service/Order.js';
import * as ProductService from '../../service/Product.js';
import { renderManagerHeader, renderUserHeader } from '../../components/header.component.js';
import { cartItems } from '../common.js';

const header = document.querySelector('.header');
const productContainer = document.querySelector('.products-container');

window.addEventListener('load', async () => {
  await fetchAll(); //取得API資料

  /* 判斷是否為使用者或管理者*/
  if (true) {
    renderManagerHeader(header, cartItems.length); //管理員頁面
  } else {
    renderUserHeader(header, cartItems.length); //使用者頁面
  }
  //渲染商品
  ProductService.getList().forEach(product => {
    productContainer.innerHTML += renderProductItem(product);
  });
  //渲染購物車
});

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
