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
    const promises = [
      this.opService.getOrderProduct(this.memberId), //取得使用者所以訂單商品
      this.oService.getOrder(this.memberId), //取得使用者所有訂單資訊
      this.pService.getProducts(), //取得所有商品資訊
      this.tService.getTransactionType(), //取得所有交易方式
      this.dService.getDeliveryMethod(), //取得所有運送方式
    ];
    // 等待API取得全部資料
    const results = await Promise.allSettled(promises);
    this.orderProducts = results[0].value;
    this.orders = results[1].value;
    this.products = results[2].value;
    this.transactions = results[3].value;
    this.deliverys = results[4].value;

    const order_container = container.querySelector('.container');
    this.orders.forEach(order => {
      const filterOrderProducts = this.orderProducts.filter(op => op.orderId === order.id);
      order_container.innerHTML += this.renderOrderItem(order, filterOrderProducts);
      const productWrap = order_container.querySelector('.order-product-wrap');
      filterOrderProducts.forEach(orderProduct => {
        productWrap.innerHTML += this.renderProducts(orderProduct);
      });
    });
  }
  //資料格式 order:{id:number, transactionId:number, address:number, deliveryId:number, status:number}
  renderOrderItem(order, filterOrderProducts) {
    const counts = filterOrderProducts.reduce((acc, curr) => (acc += curr.quantity), 0);
    const total = filterOrderProducts.reduce((acc, curr) => (acc += curr.quantity * curr.eachProductPrice), 0);
    const div = `
    <div class="order-item">
      <div class="title padding">訂單編號：${order.id}</div>
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
  //data:{orderId:number, productId:number, quantity:number, eachProductPrice:number}
  renderProducts(orderProduct) {
    const div = `
      <div class="order-product">商品名稱：${this.getProduct(orderProduct.productId).name} / 購買價格：${
      orderProduct.eachProductPrice
    } / 購買數量：${orderProduct.quantity}</div>
    `;
    return div;
  }

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
  getProduct(productId) {
    return this.products.find(p => p.id === productId);
  }
  getTransaction(tId) {
    return this.transactions.find(t => t.id === tId);
  }
  getDelivery(dId) {
    return this.deliverys.find(d => d.id === dId);
  }
}
