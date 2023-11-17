import { toRegister, toMain } from '../common.js';

const form = document.querySelector('.form');
const register = document.querySelector('.register');
const pxwd = document.querySelector('.pxwd');
const account = document.querySelector('.account');

window.addEventListener('load', () => {
  reset();
});

form.addEventListener('submit', e => {
  e.preventDefault();

  //儲存登入資訊在LocalStorage
  if (!isValueOk()) {
    alert('帳號或密碼不得為空');
    return;
  }

  //帳號密碼輸入錯誤
  if (false) {
    alert('帳號或密碼輸入錯誤');
    return;
  }

  alert('登入成功');
  toMain();
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
