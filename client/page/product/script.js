//管理員編輯商品頁面
import * as router from '../../router/router2.js';
import * as storage from '../../lib/localstorage.js';
import { AUTH_MANAGER, AUTH_USER } from '../../enum/auth.js';
window.addEventListener('load', () => {
  const auth = storage.getAuth();
  if (!auth || (auth !== AUTH_MANAGER && auth !== AUTH_USER)) {
    storage.clearAll();
    router.toLogin();
  } else if (auth === AUTH_USER) {
    router.toMain();
  }
});
