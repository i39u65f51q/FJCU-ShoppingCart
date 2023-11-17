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

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!isValueOk()) {
    alert('註冊失敗：資料不得為空');
    return;
  }

  //TODO: CALL申請帳號API

  alert('註冊帳號成功');
  toLogin();
});

function isValueOk() {
  return account.value && pxwd.value && username.value && phone.value;
}

function toLogin() {
  window.location.href = '../login/index.html';
}

function reset() {
  account.value = '';
  pxwd.value = '';
  username.value = '';
  phone.value = '';
}
