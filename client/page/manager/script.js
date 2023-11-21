//管理員編輯會員頁面
import { renderManagerHeader } from '../../components/header.component.js';
import { AUTH_MANAGER } from '../../enum/auth.js';
import * as storage from '../../lib/localstorage.js';
import { toLogin } from '../common.js';

const header = document.querySelector('.header');

window.addEventListener('load', () => {
  const auth = storage.getAuth();
  if (!auth) {
    toLogin();
    return;
  } else if (auth === AUTH_USER) {
    toMain();
    return;
  } else if (auth !== AUTH_MANAGER) {
    storage.clearAuth();
    toLogin();
    return;
  }

  header.innerHTML = renderManagerHeader(); //管理員頁面
});
