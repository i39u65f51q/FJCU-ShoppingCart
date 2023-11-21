import { toRegister, toMain, toManager } from '../common.js';
import { checkAuth } from '../../lib/fetch.js';
import * as storage from '../../lib/localstorage.js';
import * as AuthService from '../../service/Auth.js';
import { AUTH_MANAGER, AUTH_USER } from '../../enum/auth.js';

const form = document.querySelector('.form');
const register = document.querySelector('.register');
const pxwd = document.querySelector('.pxwd');
const account = document.querySelector('.account');

window.addEventListener('load', () => {
  reset();
});

form.addEventListener('submit', async e => {
  e.preventDefault();

  //儲存登入資訊在LocalStorage
  if (!isValueOk()) {
    alert('帳號或密碼不得為空');
    return;
  }

  const payload = {
    account: account.value,
    password: pxwd.value,
  };
  const res = await checkAuth(payload);
  console.log(res.content);
  if (!res.success) {
    alert('帳號或密碼輸入錯誤');
    return;
  }
  alert('登入成功');
  const auth = res.content.authority;
  storage.setAuth(auth); //會員權限
  AuthService.setAuth(res.content); //會員資料
  if (auth === AUTH_USER) {
    toMain(); //主頁面
  } else if (auth === AUTH_MANAGER) {
    toManager(); //管理頁面
  }
});

register.addEventListener('click', e => {
  e.preventDefault();
  toRegister();
});

function isValueOk() {
  return account.value && pxwd.value;
}

function reset() {
  account.value = '';
  pxwd.value = '';
}
