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
    this.returnBtn = container.querySelector('.return');
    this.form = container.querySelector('form');
    this.phone = container.querySelector('.phone');
    this.name = container.querySelector('.name');
    this.pxwd = container.querySelector('.pxwd');
    this.account = container.querySelector('.account');
    this.handleReturnBtnEvent();
    this.handleFormSubmitEvent();
  }
  handleReturnBtnEvent() {
    this.returnBtn.addEventListener('click', e => {
      e.preventDefault();
      this.router.toLogin();
    });
  }
  handleFormSubmitEvent() {
    this.form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!this.checkValue()) {
        alert('註冊失敗：資料不得為空');
        return;
      }

      //註冊帳號API
      const payload = {
        account: this.account.value,
        password: this.pxwd.value,
        phone: this.phone.value,
        name: this.name.value,
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
  checkValue() {
    return this.account.value !== '' && this.pxwd.value !== '' && this.name.value !== '' && this.phone.value !== '';
  }
  reset() {
    this.account.value = '';
    this.pxwd.value = '';
    this.name.value = '';
    this.phone.value = '';
  }
}
