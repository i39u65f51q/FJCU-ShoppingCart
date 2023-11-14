const form = document.querySelector('.form');
const register = document.querySelector('.register');

window.addEventListener('load', () => {
  console.log('登入頁面');
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
  //註冊帳號密碼
});
