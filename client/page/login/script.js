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
  if (true) {
    window.location = '../main/index.html';
  }
});

register.addEventListener('click', e => {
  e.preventDefault();
  window.location.href = '../register/index.html';
  //註冊帳號密碼
});

function reset() {
  account.value = '';
  pxwd.value = '';
}
