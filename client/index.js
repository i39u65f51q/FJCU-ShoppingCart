//1. 檢查LocalStorage是否有Token，無Token導向登入頁面
//2. 有Token檢查權限，決定使用者顯示UI
import * as storage from './lib/localstorage.js';

//Token驗證
window.addEventListener('load', () => {
  const token = storage.getToken();

  if (token) {
    window.location = 'page/main/index.html';
  } else {
    window.location = 'page/login/index.html';
  }
});
