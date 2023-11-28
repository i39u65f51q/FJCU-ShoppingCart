//使用者商品主頁面
import * as ProductService from '../../service/Product.js';
import * as DeliveryMethodService from '../../service/DeliveryMethod.js';
import * as TransactionTypeService from '../../service/TransactionType.js';
import { renderUserHeader } from '../../components/header.component.js';
import { toLogin, toManager, routerEvent } from '../common.js';
import * as storage from '../../lib/localstorage.js';
import { AUTH_MANAGER, AUTH_USER } from '../../enum/auth.js';

const header = document.querySelector('.header');
const cartsWrap = document.querySelector('.carts-wrap');
const productContainer = document.querySelector('.products-container');
const sendOrderBtn = document.querySelector('.send-order');
const addressElement = document.querySelector('.address');

let carts = storage.getCarts() || [];
let products = [];
let deliveryMethods = [];
let transactionTypes = [];

const orderPayload = {
  memberId: -1,
  address: '',
  status: 1,
  deliveryId: -1,
  transactionId: -1,
  products: [
    { pId: 1, count: 1, per_price: 10 },
    { pId: 1, count: 1, per_price: 10 },
  ],
  total: -1,
};

window.addEventListener('load', async () => {
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
  routerEvent();
  await fetchAll();
  //渲染商品
  renderProducts();
  //渲染購物車
  renderCarts();
  //渲染付款方式
  renderTransaction();
  //渲染運送方式
  renderDelivery();

  //登出
  document.querySelector('.logout').addEventListener('click', () => {
    toLogin();
    storage.clearAll();
  });
});

sendOrderBtn.addEventListener('click', async e => {
  if (carts.length === 0) {
    alert('購物車為空');
    return;
  }

  orderPayload.memberId = storage.getMemberId() || -1;
  orderPayload.products = carts.map(cart => ({ pId: cart.id, count: cart.count, per_price: cart.per_price }));
  orderPayload.address = addressElement.value;
  console.log(orderPayload); //FIXME:
  if (confirm('確認是否送出訂單') == true) {
    if (orderPayload.memberId == -1) {
      alert('會員編號異常');
      return;
    }

    /* TODO: CALL API 新增訂單
      1. 建立訂單
      2. 修改商品庫存
    */
    storage.clearCarts();
    carts = [];
    addressElement.value = '';
    renderCarts();
    renderProducts();
  }
});

/* 商品資料 */
function renderProducts() {
  products.forEach(product => {
    productContainer.innerHTML += renderProductItem(product);
  });
  //點擊新增商品事件
  document.querySelectorAll('.add-btn').forEach((btn, index) => {
    btn.addEventListener('click', e => {
      const item = products[index];
      let findIndex = -1;
      if (carts.length !== 0) {
        findIndex = carts.findIndex(c => c.id === item.id);
      }
      if (findIndex !== -1) {
        carts[findIndex].count++;

        if (carts[findIndex].count > item.quantity) {
          alert('超過商品庫存');
          carts[findIndex].count--;
          return;
        }
      } else {
        carts.push({
          id: products[index].id,
          count: 1,
          name: products[index].name,
          per_price: products[index].price,
        });
      }
      storage.setCarts(carts);
      renderCarts();
    });
  });
}
function renderProductItem(product) {
  const content = `
  <div class="product-item" style="width: 300px; height: auto; border: 1px solid #eee; border-radius:6px; box-shadow:0px 3px 3px rgba(0,0,0,0.5); overflow:hidden;">
    <div style="display: block; width: 100%; height: 120px; background-color: #eee; display:flex; align-items:center; justify-content:center;">
      <span style="color:#aaa;">${product.name} 圖片</spa>
    </div>
    <div style="width: 100%; display: flex; flex-direction: column; padding: 0.5rem">
      <div><span>商品名稱：</span><span class="name">${product.name}</span></div>
      <div><span>商品價格：</span><span class="price">${product.price}</span></div>
      <div><span>剩餘庫存：</span><span>${product.quantity}</span></div>
      <button class="add-btn" style="margin-top:0.5rem">新增至購物車</button>
    </div>
  </div>
</div>`;
  return content;
}

/* 購物車項目 */
async function renderCarts() {
  cartsWrap.innerHTML = '';
  carts.forEach(cart => {
    cartsWrap.innerHTML += renderCartItem(cart);
  });

  //購物車新增數量事件
  document.querySelectorAll('.plus').forEach((btn, index) => {
    btn.addEventListener('click', e => {
      const maxQuantity = products.find(p => p.id === carts[index].id).quantity;
      carts[index].count++;
      if (carts[index].count > maxQuantity) {
        alert('新增數量超過商品庫存');
        carts[index].count--;
        return;
      } else {
        storage.setCarts(carts);
        renderCarts();
      }
    });
  });
  //購物車減少數量事件
  document.querySelectorAll('.minus').forEach((btn, index) => {
    btn.addEventListener('click', e => {
      carts[index].count--;
      if (carts[index].count === 0) {
        if (confirm('是否移除商品至購物車') == true) {
          carts.splice(index, 1);
        } else {
          carts[index].count++;
          return;
        }
      }
      storage.setCarts(carts);
      renderCarts();
    });
  });
  const totalCount = carts.reduce((acc, curr) => {
    return (acc += curr.count);
  }, 0);
  const totalPrice = carts.reduce((acc, curr) => {
    return (acc += curr.per_price * curr.count);
  }, 0);

  document.querySelector('.total-count').textContent = totalCount;
  document.querySelector('.total-price').textContent = totalPrice;
  orderPayload.total = totalCount;
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
      border-bottom: 1px solid #ddd;
  ">
    <span>商品名稱 : ${cartItem.name}</span><span>數量：${cartItem.count}</span>
    <span>總價格：${cartItem.per_price * cartItem.count}</span>
    <div style="display: flex; gap: 0.5rem">
      <button class="plus">新增</button><button class="minus">減少</button>
    </div>
  </div>
  `;

  return content;
}

async function renderTransaction() {
  const transactionElement = document.querySelector('#transaction');
  transactionTypes.forEach(l => {
    transactionElement.innerHTML += `<option value="${l.id}">${l.name}</option>`;
  });
  transactionElement.addEventListener('change', e => {
    const value = e.target.value;
    orderPayload.transactionId = value;
  });
}

async function renderDelivery() {
  const deliveryElement = document.querySelector('#delivery');
  deliveryMethods.forEach(l => {
    deliveryElement.innerHTML += `<option value="${l.id}">${l.name}</option>`;
  });
  deliveryElement.addEventListener('change', e => {
    const value = e.target.value;
    orderPayload.deliveryId = value;
  });
}

async function fetchAll() {
  products = await ProductService.getProducts();
  deliveryMethods = await DeliveryMethodService.getDeliveryMethod();
  transactionTypes = await TransactionTypeService.getTransactionType();
}
