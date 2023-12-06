//508062334 陳彥志
//註冊頁面
import { RouterService } from '../../router/router.js';
import { MemberService } from '../../service/Member.js';

window.addEventListener('load', () => {
  const body = document.querySelector('body');
  const module = new RegisterModule(body);
});

class RegisterModule {
  constructor(container) {
    this.router = new RouterService();
    this.member = new MemberService();
    this.returnHandler(container);
    this.submitHandler(container);
  }
  returnHandler(container) {
    const returnBtn = container.querySelector('.return');
    returnBtn.addEventListener('click', e => {
      e.preventDefault();
      this.router.toLogin();
    });
  }
  submitHandler(container) {
    const form = container.querySelector('form');
    const phone = container.querySelector('.phone');
    const name = container.querySelector('.name');
    const pxwd = container.querySelector('.pxwd');
    const account = container.querySelector('.account');

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!this.checkValue(account, pxwd, name, phone)) {
        alert('註冊失敗：資料不得為空');
        return;
      }

      //註冊帳號API
      const payload = {
        account: account.value,
        password: pxwd.value,
        phone: phone.value,
        name: name.value,
      };
      const result = await this.member.addMember(payload);
      //檢查資料庫是否存在相同帳號
      if (result.length > 0) {
        this.account.value = '';
        this.pxwd.value = '';
        alert('此帳號已存在');
        return;
      }
      alert('註冊帳號成功，返回登入頁登入');
      this.router.toLogin();
    });
  }
  checkValue(account, pxwd, name, phone) {
    return account.value !== '' && pxwd.value !== '' && name.value !== '' && phone.value !== '';
  }
}
