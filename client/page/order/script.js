//508062334 陳彥志
//使用者查詢自己的訂單紀錄頁面，此頁面僅供「查看」無法編輯/修改
import { BaseModule } from '../../class/BaseModule.js';
import { OrderProductService } from '../../service/OrderProduct.js';
import { OrderService } from '../../service/Order.js';
import { ProductService } from '../../service/Product.js';
import { AUTH_MANAGER, AUTH_USER } from '../../enum/auth.js';
import { ORDER_PROCESSING, ORDER_DELIVERY, ORDER_ARRIVED, ORDER_FINISHED } from '../../enum/status.js';
import { TransactionTypeService } from '../../service/TransactionType.js';
import { DeliveryMethodService } from '../../service/DeliveryMethod.js';

window.addEventListener('load', () => {
  const body = document.querySelector('body');
  const module = new OrderModule(body);
});
class OrderModule extends BaseModule {
  constructor(container) {
    //如果管理員進入此頁面，導向到編輯訂單
    const header = container.querySelector('header');
    super(header);
    if (this.auth === AUTH_MANAGER) {
      //管理員顯示
    } else if (this.auth === AUTH_USER) {
      //使用者顯示
    }
    this.oService = new OrderService(); //訂單Service
    this.opService = new OrderProductService(); //訂單產品Service
    this.pService = new ProductService(); //商品Service
    this.tService = new TransactionTypeService(); //交易方式Service
    this.dService = new DeliveryMethodService(); //運送方式Service
    this.products = [];
    this.orders = [];
    this.orderProducts = [];
    this.transactions = [];
    this.deliverys = [];
    this.render(container);
  }
  async render(container) {
    const pageTitle = container.querySelector('.page-title');
    const promises = [
      this.pService.getProducts(), //取得所有商品資訊
      this.tService.getTransactionType(), //取得所有交易方式
      this.dService.getDeliveryMethod(), //取得所有運送方式
    ];
    if (this.auth === AUTH_USER) {
      pageTitle.textContent = '訂單紀錄';
      //取得使用者「訂單商品」與「訂單資訊」
      promises.push(this.opService.getOrderProduct(this.memberId), this.oService.getOrder(this.memberId)); //取得使用者訂單紀錄
    } else if (this.auth === AUTH_MANAGER) {
      pageTitle.textContent = '訂單管理';
      //取得所有人「訂單商品」與「訂單資訊」
      promises.push(this.opService.getOrderProducts(), this.oService.getOrders());
    }
    // 等待API取得全部資料
    const results = await Promise.allSettled(promises);
    this.products = results[0].value;
    this.transactions = results[1].value;
    this.deliverys = results[2].value;
    this.orderProducts = results[3].value;
    this.orders = results[4].value;

    const order_container = container.querySelector('.container');

    this.orders.forEach(order => {
      const filterOrderProducts = this.orderProducts.filter(op => op.orderId === order.id);
      //渲染訂單資訊
      order_container.innerHTML += this.renderOrderItem(order, filterOrderProducts);
      const productWraps = order_container.querySelectorAll('.order-product-wrap');
      //渲染訂單內產品資訊
      filterOrderProducts.forEach(filterOrderProduct => {
        productWraps[productWraps.length - 1].innerHTML += this.renderProducts(filterOrderProduct);
      });
    });
    //管理員新增可點擊OrderItem來改變訂單狀態
    if (this.auth === AUTH_MANAGER) {
      const itemDOMs = order_container.querySelectorAll('.order-item');
      itemDOMs.forEach(dom => {
        dom.classList.add('cursor'); //鼠標樣式
        dom.addEventListener('click', e => {
          const orderId = e.currentTarget.dataset.id; //取得html內得data-id屬性
          const status = e.currentTarget.dataset.status;
          this.dialogEvent(orderId, Number(status));
        });
      });
    }
  }
  //渲染單筆訂單資訊
  //資料格式 order:{id:number, transactionId:number, address:number, deliveryId:number, status:number}
  renderOrderItem(order, filterOrderProducts) {
    const counts = filterOrderProducts.reduce((acc, curr) => (acc += curr.quantity), 0);
    const total = filterOrderProducts.reduce((acc, curr) => (acc += curr.quantity * curr.eachProductPrice), 0);
    const div = `
    <div class="order-item" data-id="${order.id}" data-status="${order.status}">
      <div class="title padding ${this.getStatusBgStyle(order.status)}">訂單編號：${order.id} ${
      this.auth === AUTH_MANAGER ? `/ 會員編號:${order.memberId}` : ''
    }</div>
      <div class="order-detail-wrap padding">
        <div class="order-detail">配送方式：${this.getDelivery(order.deliveryId).name} / 付款方式：${
      this.getTransaction(order.transactionId).name
    } / 狀態：${this.getStatus(order.status)}</div>
        <div class="order-detail">配送地址：${order.address}</div>
      </div>
      <div class="order-product-wrap padding"></div>
      <div class="order-result-wrap padding">
        <div class="result-item">總數量：${counts} / 總金額：${total}</div>
      </div>
    </div>
  `;
    return div;
  }
  //渲染單筆訂單內商品資訊
  //data:{orderId:number, productId:number, quantity:number, eachProductPrice:number}
  renderProducts(orderProduct) {
    const div = `
      <div class="order-product">商品名稱：${this.getProduct(orderProduct.productId).name} / 購買價格：${
      orderProduct.eachProductPrice
    } / 購買數量：${orderProduct.quantity}</div>
    `;
    return div;
  }

  dialogEvent(orderId, status) {
    const dialog = document.querySelector('dialog');
    dialog.showModal();
    const title = dialog.querySelector('.title');
    title.textContent = `修改訂單編號:${orderId}`;
    const selectStatus = dialog.querySelector('#select-status');
    const closeBtn = dialog.querySelector('.dialog-cancel');
    const confirmBtn = dialog.querySelector('.dialog-confirm');
    //下拉選單，預設數值
    selectStatus.value = status;
    selectStatus.addEventListener('change', e => {
      status = Number(e.target.value);
    });
    //關閉按鈕
    closeBtn.addEventListener('click', () => {
      dialog.close();
    });
    //確認按鈕
    confirmBtn.addEventListener('click', async e => {
      e.preventDefault();
      //呼叫更新訂單狀態API
      const success = await this.oService.updateOrder({ orderId, status });
      if (success) {
        alert(`訂單編號:${orderId} 狀態修改成功`);
      } else {
        alert(`訂單編號:${orderId} 狀態修改失敗`);
      }
      location.reload(); //畫面刷新
    });
  }

  //取得Status
  getStatus(status) {
    switch (status) {
      case ORDER_PROCESSING:
        return '訂單處理中';
      case ORDER_DELIVERY:
        return '訂單運送中';
      case ORDER_ARRIVED:
        return '訂單已送達';
      case ORDER_FINISHED:
        return '訂單已完成';
      default:
        '狀態未知';
    }
  }

  getStatusBgStyle(status) {
    switch (status) {
      case ORDER_PROCESSING:
        return 'processing';
      case ORDER_DELIVERY:
        return 'deliverying';
      case ORDER_ARRIVED:
        return 'arrived';
      case ORDER_FINISHED:
        return 'finished';
      default:
        '狀態未知';
    }
  }
  //取得商品
  getProduct(productId) {
    return this.products.find(p => p.id === productId);
  }
  //取得交易方式
  getTransaction(tId) {
    return this.transactions.find(t => t.id === tId);
  }
  //取得運送方式
  getDelivery(dId) {
    return this.deliverys.find(d => d.id === dId);
  }
}
