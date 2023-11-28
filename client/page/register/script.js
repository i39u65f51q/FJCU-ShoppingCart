//註冊頁面
import { toLogin } from '../common.js';
import * as MemberService from '../../service/Member.js';

const account = document.querySelector('.account');
const pxwd = document.querySelector('.pxwd');
const username = document.querySelector('.name');
const phone = document.querySelector('.phone');
const returnBtn = document.querySelector('.return');
const form = document.querySelector('form');

window.addEventListener('load', () => {
  reset();
});

returnBtn.addEventListener('click', e => {
  e.preventDefault();

  toLogin();
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!isValueOk()) {
    alert('註冊失敗：資料不得為空');
    return;
  }

  //註冊帳號API
  const payload = {
    account: account.value,
    password: pxwd.value,
    phone: phone.value,
    name: username.value,
  };
  const result = await MemberService.addMember(payload);
  if (result.length > 0) {
    account.value = '';
    pxwd.value = '';
    alert('此帳號已存在');
    return;
  }
  alert('註冊帳號成功，返回登入頁登入');
  toLogin();
});

function isValueOk() {
  return account.value && pxwd.value && username.value && phone.value;
}

function reset() {
  account.value = '';
  pxwd.value = '';
  username.value = '';
  phone.value = '';
}
