//508062334 陳彥志
//管理員編輯商品頁面
import { AUTH_USER } from '../../enum/auth.js';
import { BaseModule } from '../../class/BaseModule.js';
import { ProductService } from '../../service/Product.js';
window.addEventListener('load', () => {
  const body = document.querySelector('body');
  const module = new ProductModule(body);
});

class ProductModule extends BaseModule {
  constructor(container) {
    const header = container.querySelector('header');
    super(header);
    //如果使用者進入此頁面，導向到主頁面
    if (this.auth === AUTH_USER) {
      this.router.toMain();
      return;
    }
    this.product = new ProductService();
    this.products = [];
    this.renderProducts(container);
    this.addEvent(container);
  }
  //渲染產品
  async renderProducts(body) {
    const container = body.querySelector('div.container');
    const products = await this.product.getProducts();
    this.products = products.filter(p => !p.disabled); //不顯示disabled=1的商品

    this.products.forEach(p => {
      container.innerHTML += this.renderProduct(p);
    });
    this.updateEvent(container);
    this.cancelEvent(container);
    this.deleteEvent(container);
  }
  //單一產品DOM
  renderProduct(product) {
    const item = `
    <div class="item" data-id="${product.id}">
      <div>
        <label for="id">商品編號：${product.id}</label>
      </div>
      <div>
        <label for="name">商品名稱：</label>
        <input type="text" id="name" value="${product.name}" />
      </div>
      <div>
        <label for="price">商品價格：</label>
        <input type="number" id="price" min="0" value="${product.price}" />
      </div>
      <div>
        <label for="quantity">商品庫存：</label>
        <input type="number" id="quantity" min="0" value="${product.quantity}" />
      </div>
      <div class="button-wrap">
        <button class="button confirm">更新</button>
        <button class="button cancel">取消</button>
        <button class="button delete">刪除</button>
      </div>
    </div>`;
    return item;
  }
  //點擊新增商品按鈕事件
  addEvent(container) {
    const addBtn = container.querySelector('button.create');
    addBtn.addEventListener('click', async () => {
      const addDOM = container.querySelector('div.add-container');
      addDOM.classList.add('active');
      //點擊dialog內確認按鈕
      addDOM.querySelector('.confirm').addEventListener('click', async event => {
        const name = addDOM.querySelector('#name');
        const price = addDOM.querySelector('#price');
        const quantity = addDOM.querySelector('#quantity');
        const payload = {
          name: name.value,
          price: price.value,
          quantity: quantity.value,
        };
        //欄位檢查
        if (!payload.name || !payload.price || !payload.quantity) {
          alert('欄位不得為空');
          return;
        }
        //新增商品API
        const result = await this.product.addProduct(payload);
        result ? alert('成功建立商品') : alert('建立商品失敗');
        location.reload();
      });
      //點擊dialog內取消按鈕
      addDOM.querySelector('.cancel').addEventListener('click', async event => {
        event.preventDefault();
        addDOM.classList.remove('active');
      });
    });
  }

  //點擊更新按鈕事件
  updateEvent(container) {
    const updateBtns = container.querySelectorAll('button.confirm');
    updateBtns.forEach(btn =>
      btn.addEventListener('click', async event => {
        const id = event.currentTarget.parentNode.parentNode.dataset.id;
        if (confirm(`是否更新編號:${id} 產品`)) {
          //選取id input DOM 取得數值
          const { name, price, quantity } = this.getProductDOM(container, id);
          const payload = {
            id: id,
            name: name.value,
            quantity: quantity.value,
            price: price.value,
          };
          const result = await this.product.updateProduct(payload);
          result ? alert('商品更新成功') : alert('商品更新失敗');
          location.reload(); //刷新頁面
        }
      }),
    );
  }
  //點擊刪除按鈕事件
  deleteEvent(container) {
    const deleteBtns = container.querySelectorAll('button.delete');
    deleteBtns.forEach(btn =>
      btn.addEventListener('click', async event => {
        const id = event.currentTarget.parentNode.parentNode.dataset.id;
        if (confirm(`是否刪除編號:${id} 產品`)) {
          //並非真的刪除，而是將product得disabled設1，因為fk關聯到op資料表。
          const result = await this.product.deleteProduct(id);
          result ? alert('商品已刪除') : alert('商品刪除失敗');
          location.reload();
        }
      }),
    );
  }
  //點擊取消按鈕事件
  cancelEvent(container) {
    const cancelBtns = container.querySelectorAll('button.cancel');
    cancelBtns.forEach(btn =>
      btn.addEventListener('click', async event => {
        const id = event.currentTarget.parentNode.parentNode.dataset.id;

        if (confirm(`是否恢復編號:${id}產品修改前狀態`)) {
          const product = this.products.find(p => p.id === Number(id)) || null;
          if (!product) return;
          const { name, price, quantity } = this.getProductDOM(container, id);
          name.value = product.name;
          price.value = product.price;
          quantity.value = product.quantity;
        }
      }),
    );
  }
  //取得對應id DOM：名稱, 價格, 數量
  getProductDOM(container, productId) {
    const item = container.querySelector(`[data-id="${productId}"]`); //選取DOM
    const name = item.querySelector('input#name');
    const price = item.querySelector('input#price');
    const quantity = item.querySelector('input#quantity');
    return { name, price, quantity };
  }
}
