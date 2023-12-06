import { AUTH_USER, AUTH_MANAGER } from '../enum/auth.js';
import { StorageService } from '../lib/localstorage.js';
import { RouterService } from '../router/router.js';

//除了登入/註冊頁面，都會繼承BaseModule
export class BaseModule {
  constructor(headerElement) {
    this.header = headerElement;
    this.router = new RouterService();
    this.storage = new StorageService();
    this.memberId = this.storage.getMemberId();
    this.auth = this.storage.getAuth();
    this.checkIdentity();
  }

  checkIdentity() {
    if (!this.auth) {
      this.router.toLogin();
      this.storage.clearAll();
      return;
    }
    if (this.auth === AUTH_USER) {
      this.header.innerHTML = this.renderUserHeader();
    } else if (this.auth === AUTH_MANAGER) {
      this.header.innerHTML = this.renderUserHeader();
    }
    this.headerRouterEvent();
  }

  renderManagerHeader() {
    const header = `
    <header style="width:100%; display:flex; justify-content:space-between;align-items=center; padding: 1rem 2rem; height:50px; position:fixed; top:0; left:0; right:0;background-color:#677891;box-shadow:2px 3px 3px rgba(0,0,0,0.2);z-index:99">
      <div style="width:50%; ">
        <h2 style="text-align=center; font-size:1.2rem">BuyGo</h2>  
      </div>
      <div style="width:50%; display:flex; gap:1rem; justify-content:flex-end">  
        <nav style="display:flex; align-items:center;gap:1rem;">
          <span class="order-manage-page">訂單管理</span>
          <span class="product-page">商品管理</span>
        </nav>
        <button class="logout">登出</button>
      </div>
    <header>  
    `;
    return header;
  }

  renderUserHeader() {
    const header = `
    <header style="width:100%; display:flex; justify-content:space-between;align-items=center; padding: 1rem 2rem; height:50px; position:fixed; top:0; left:0; right:0;background-color:#677891;box-shadow:2px 3px 3px rgba(0,0,0,0.2); z-index:99">
      <div style="width:50%; ">
      <h2 style="text-align=center; font-size:1.2rem">BuyGo</h2>  
      </div>
      <div style="width:50%; display:flex; gap:1rem; justify-content:flex-end; align-items:center;">  
        <nav style="display:flex; align-items:center;gap:1rem;">
        <span class="main-page" style="cursor:pointer">商品頁面</span>        
        <span class="order-page" style="cursor:pointer">訂單紀錄</span>
        <span class="member-page" style="cursor:pointer">編輯個人資料</span>        
        </nav>
        <button class="logout" style="width:70px;height:25px; ">登出</button>
      </div>
    <header>  
    `;
    return header;
  }

  headerRouterEvent() {
    const logout = document.querySelector('.logout');
    if (logout) {
      logout.addEventListener('click', () => {
        this.router.toLogin();
        this.storage.clearAll();
      });
    }

    const main = document.querySelector('.main-page');
    if (main) {
      main.addEventListener('click', () => {
        this.router.toMain();
      });
    }
    const order = document.querySelector('.order-page');
    if (order) {
      order.addEventListener('click', () => {
        this.router.toOrder();
      });
    }
    const manage = document.querySelector('.manage-page');
    if (manage) {
      manage.addEventListener('click', () => {
        this.router.toManager();
      });
    }
    const member = document.querySelector('.member-page');
    if (member) {
      member.addEventListener('click', () => {
        this.router.toMember();
      });
    }
    const orderManager = document.querySelector('.order-manage-page');
    if (orderManager) {
      orderManager.addEventListener('click', () => {
        this.router.toOrderManager();
      });
    }
  }
}
