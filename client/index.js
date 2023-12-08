//508062334 陳彥志
//1. 檢查LocalStorage是否有Auth，無Auth導向登入頁面 註：Auth代替Token
//2. 有Token檢查權限，決定使用者顯示UI
import { AUTH_MANAGER, AUTH_USER } from './enum/auth.js';
import { StorageService } from './lib/localstorage.js';

window.addEventListener('load', () => {
  const module = new AppModule();
});
//身份驗證決定路由導向
class AppModule {
  constructor() {
    this.storage = new StorageService();
    const auth = this.storage.getAuth();
    if (!auth) {
      window.location.href = './page/login/index.html';
    } else if (auth === AUTH_MANAGER) {
      window.location.href = './page/order/index.html';
    } else if (auth === AUTH_USER) {
      window.location.href = './page/main/index.html';
    } else {
      this.storage.clearAll();
      window.location.href = './page/login/index.html';
    }
  }
}
