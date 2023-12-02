//管理員修改訂單狀態頁面
import * as router from '../../router/router2.js';
import { AUTH_MANAGER, AUTH_USER } from '../../enum/auth.js';

window.addEventListener('load', () => {
  const auth = storage.getAuth();
  if (!auth) {
    storage.clearAll();
    router.toLogin();
  } else if (auth !== AUTH_MANAGER && auth === AUTH_USER) {
    router.toMain();
  } else {
    storage.clearAll();
    router.toLogin();
  }
});
