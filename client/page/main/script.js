import * as MemberService from '../../service/Member.js';
import * as OrderService from '../../service/Order.js';
import * as ProductService from '../../service/Product.js';

const container = document.querySelector('.container');

window.addEventListener('load', async () => {
  renderLoading();
  await fetchAll();
  setTimeout(() => {
    renderMain();
  }, 1000);
});

function renderLoading() {
  container.innerHTML = `
  <span>載入資料中...</span>
    `;
}

function renderMain() {
  container.innerHTML = `    
      <span>主頁面</span>
    `;
}

async function fetchAll() {
  //   const promises = [MemberService.initialize(), OrderService.initialize(), ProductService.initialize()];
  //   await Promise.all(promises);
}
