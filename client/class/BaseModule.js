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
    <header style="width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; height: 60px; position: fixed; top: 0; left: 0; right: 0; background-color: #6dd5ed; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); z-index: 99">
    <h2 style="flex-grow: 0; text-align: left; font-size: 1.5rem; color: white; margin: 0;">BuyGo</h2>  
      <nav style="flex-grow: 1; display: flex; justify-content: flex-end; align-items: center; gap: 1rem; margin-right: 5%;">
        <span class="main-page" style="cursor: pointer; color: white; font-size: 1rem;">商品頁面</span>        
        <span class="order-page" style="cursor: pointer; color: white; font-size: 1rem;">訂單紀錄</span>
        <span class="member-page" style="cursor: pointer; color: white; font-size: 1rem;">編輯個人資料</span>        
        <button class="logout" style="background-color: white; color: #6dd5ed; border: 1px solid #6dd5ed; border-radius: 4px; padding: 5px 10px; cursor: pointer;">登出</button>
      </nav>
    </header>
    `;
    return header;
  }

  renderUserHeader() {
    const header = `
    <header style="width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; height: 60px; position: fixed; top: 0; left: 0; right: 0; background-color: #6dd5ed; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); z-index: 99">
    <h2 style="flex-grow: 0; text-align: left; font-size: 1.5rem; color: white; margin: 0;">BuyGo</h2>  
    <nav style="flex-grow: 1; display: flex; justify-content: flex-end; align-items: center; gap: 1rem; margin-right: 5%;">
        <span class="main-page" style="cursor: pointer; color: white; font-size: 1rem;">商品頁面</span>        
        <span class="order-page" style="cursor: pointer; color: white; font-size: 1rem;">訂單紀錄</span>
        <span class="member-page" style="cursor: pointer; color: white; font-size: 1rem;">編輯個人資料</span>        
        <button class="logout" style="background-color: white; color: #6dd5ed; border: 1px solid #6dd5ed; border-radius: 4px; padding: 5px 10px; cursor: pointer;">登出</button>
      </nav>
  </header>
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
