//508062334 陳彥志
//使用者商品主頁面
import { ProductService } from '../../service/Product.js';
import { DeliveryMethodService } from '../../service/DeliveryMethod.js';
import { TransactionTypeService } from '../../service/TransactionType.js';
import { BaseModule } from '../../class/BaseModule.js';
import { AUTH_MANAGER } from '../../enum/auth.js';

window.addEventListener('load', () => {
  const body = document.querySelector('body');
  const module = new MainModule(body);
});
class MainModule extends BaseModule {
  constructor(container) {
    const header = container.querySelector('.header');
    super(header);
    //如果管理員進入此頁面，導向到編輯訂單頁面
    if (this.auth === AUTH_MANAGER) {
      this.router.toOrder();
      return;
    }
    this.carts = this.storage.getCarts() || [];
    this.products = [];
    this.product = new ProductService();
    this.deliveryMethod = new DeliveryMethodService();
    this.transactionTypes = new TransactionTypeService();
    this.orderInfo = {
      memberId: this.memberId,
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
    this.submitHandler(container);
    this.renderProducts(container); //商品
    this.renderTransaction(container); //付款方式
    this.renderDelivery(container); //運送方式
    this.renderCarts(container); //購物車
  }

  submitHandler(container) {
    const sendOrderBtn = container.querySelector('.send-order');

    sendOrderBtn.addEventListener('click', async e => {
      if (this.carts.length === 0) {
        alert('購物車為空');
        return;
      }
      const address = container.querySelector('.address');
      this.orderInfo.address = address.value;
      this.orderInfo.products = this.carts.map(cart => ({
        pId: cart.id,
        count: cart.count,
        per_price: cart.per_price,
      }));

      if (confirm('確認是否送出訂單') == true) {
        if (this.orderInfo.memberId == -1) {
          alert('會員編號異常');
          return;
        }

        /* TODO: CALL API 新增訂單
          1. 建立訂單
          2. 修改商品庫存
        */
        this.storage.clearCarts();
        this.carts = [];
        address.value = '';
        this.renderCarts();
        this.renderProducts();
      }
    });
  }

  //渲染產品資訊
  async renderProducts(container) {
    const products = await this.product.getProducts();
    this.products = products;
    const productContainer = container.querySelector('.products-container');
    products.forEach(product => {
      productContainer.innerHTML += renderProductItem(product);
    });
    //點擊新增商品事件
    document.querySelectorAll('.add-btn').forEach((btn, index) => {
      btn.addEventListener('click', e => {
        const item = products[index];
        let findIndex = -1;
        if (this.carts.length !== 0) {
          findIndex = this.carts.findIndex(c => c.id === item.id);
        }
        if (findIndex !== -1) {
          this.carts[findIndex].count++;

          if (this.carts[findIndex].count > item.quantity) {
            alert('超過商品庫存');
            this.carts[findIndex].count--;
            return;
          }
        } else {
          this.carts.push({
            id: products[index].id,
            count: 1,
            name: products[index].name,
            per_price: products[index].price,
          });
        }
        this.storage.setCarts(this.carts);
        this.renderCarts(container);
      });
    });
    //單一商品資訊
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
  }

  //渲染購物車清單
  async renderCarts(container) {
    const cartsWrap = container.querySelector('.carts-wrap');
    cartsWrap.innerHTML = '';
    this.carts.forEach(cart => {
      cartsWrap.innerHTML += renderCartItem(cart);
    });
    //購物車新增數量事件
    container.querySelectorAll('.plus').forEach((btn, index) => {
      btn.addEventListener('click', e => {
        const maxQuantity = this.products.find(p => p.id === this.carts[index].id).quantity;
        this.carts[index].count++;
        if (this.carts[index].count > maxQuantity) {
          alert('新增數量超過商品庫存');
          this.carts[index].count--;
          return;
        } else {
          this.storage.setCarts(this.carts);
          this.renderCarts(container);
        }
      });
    });
    //購物車減少數量事件
    document.querySelectorAll('.minus').forEach((btn, index) => {
      btn.addEventListener('click', e => {
        this.carts[index].count--;
        if (this.carts[index].count === 0) {
          if (confirm('是否移除商品至購物車') == true) {
            this.carts.splice(index, 1);
          } else {
            this.carts[index].count++;
            return;
          }
        }
        this.storage.setCarts(this.carts);
        this.renderCarts(container);
      });
    });
    const totalCount = this.carts.reduce((acc, curr) => {
      return (acc += curr.count);
    }, 0);
    const totalPrice = this.carts.reduce((acc, curr) => {
      return (acc += curr.per_price * curr.count);
    }, 0);

    container.querySelector('.total-count').textContent = totalCount;
    container.querySelector('.total-price').textContent = totalPrice;
    this.orderInfo.total = totalCount;

    //單一購物車資訊
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
  }
  //渲染交易方式
  async renderTransaction(container) {
    const transactionElement = container.querySelector('#transaction');
    const transactionTypes = await this.transactionTypes.getTransactionType();
    transactionTypes.forEach(l => {
      transactionElement.innerHTML += `<option value="${l.id}">${l.name}</option>`;
    });
    transactionElement.addEventListener('change', e => {
      const value = e.target.value;
      this.orderInfo.transactionId = value;
    });
  }

  async renderDelivery(container) {
    const deliveryElement = container.querySelector('#delivery');
    const deliveryMethods = await this.deliveryMethod.getDeliveryMethod();
    deliveryMethods.forEach(l => {
      deliveryElement.innerHTML += `<option value="${l.id}">${l.name}</option>`;
    });
    deliveryElement.addEventListener('change', e => {
      const value = e.target.value;
      this.orderInfo.deliveryId = value;
    });
  }
}
