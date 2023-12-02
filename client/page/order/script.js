//使用者查詢自己的訂單紀錄頁面
import * as router from '../../router/router2.js';
import * as storage from '../../lib/localstorage.js';
import { AUTH_MANAGER, AUTH_USER } from '../../enum/auth.js';
window.addEventListener('load', () => {
  const memberId = storage.getMemberId();
  const auth = storage.getAuth();
  if (!memberId || !auth) {
    storage.clearAll();
    router.toLogin();
  } else if (auth !== AUTH_USER && auth === AUTH_MANAGER) {
    router.toOrderManager();
  } else {
    storage.clearAll();
    router.toLogin();
  }
});
