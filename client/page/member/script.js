//使用者編輯會員資料頁面
import * as MemberService from '../../service/Member.js';
import * as storage from '../../lib/localstorage.js';
import { renderUserHeader } from '../../components/header.component.js';
import { routerEvent } from '../common.js';

const account = document.querySelector('.account');
const pxwd = document.querySelector('.pxwd');
const name = document.querySelector('.name');
const phone = document.querySelector('.phone');
const header = document.querySelector('.header');
const form = document.querySelector('.form');

window.addEventListener('load', async () => {
  await render();
  header.innerHTML = renderUserHeader();
  routerEvent();
});

form.addEventListener('submit', async e => {
  e.preventDefault();

  const payload = {
    account: account.textContent,
    password: pxwd.value,
    name: name.value,
    phone: phone.value,
  };

  if (!payload.password || !payload.name || !payload.phone) {
    alert('欄位不得為空');
    return;
  }
  const result = await MemberService.updateMember(payload);
  if (result) {
    alert('資料變更成功');
  }
});

async function render() {
  const memberId = storage.getMemberId();
  const result = await MemberService.getMember(memberId);
  if (result) {
    account.textContent = result.account;
    pxwd.value = result.password;
    name.value = result.name;
    phone.value = result.phone;
  }
}
