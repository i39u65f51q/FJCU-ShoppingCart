//登入頁面
import { RouterService } from '../../router/router.js';
import { StorageService } from '../../lib/localstorage.js';
import { AUTH_MANAGER, AUTH_USER } from '../../enum/auth.js';
import { MemberService } from '../../service/Member.js';

window.addEventListener('load', () => {
  const body = document.querySelector('body');
  const module = new LoginModule(body);
});

class LoginModule {
  constructor(container) {
    this.form = container.querySelector('.form');
    this.register = container.querySelector('.register');
    this.pxwd = container.querySelector('.pxwd');
    this.account = container.querySelector('.account');
    this.router = new RouterService();
    this.member = new MemberService();
    this.storage = new StorageService();
    this.listRegisterClickEvent(); //監聽註冊按鈕點擊事件
    this.listenFormSubmitEvent(); //監聽Form事件
  }
  listenFormSubmitEvent() {
    this.form.addEventListener('submit', async e => {
      e.preventDefault();
      //帳密欄位檢查
      if (!this.checkValue()) {
        alert('帳號或密碼不得為空');
        return;
      }
      //登入驗證
      const success = await this.isLoginSuccess();
      if (!success) return;

      alert('登入成功');
      //確認身份為「管理員」還是「使用者」
      const auth = this.storage.getAuth();
      if (auth === AUTH_USER) {
        this.router.toMain(); //主頁面
      } else if (auth === AUTH_MANAGER) {
        this.router.toOrderManager(); //訂單管理頁面
      }
    });
  }
  listRegisterClickEvent() {
    this.register.addEventListener('click', e => {
      e.preventDefault();
      this.router.toRegister();
    });
  }
  resetValue() {
    this.account.value = '';
    this.pxwd.value = '';
  }
  checkValue() {
    return this.account.value !== '' && this.pxwd.value !== '';
  }
  async isLoginSuccess() {
    const payload = {
      account: this.account.value,
      password: this.pxwd.value,
    };
    const content = await this.member.checkAuth(payload);
    //帳號尚未申請
    if (content.length === 0) {
      alert('此帳號尚未申請');
      reset();
      return false;
    }
    //密碼輸入錯誤
    if (content.password !== this.pxwd.value) {
      alert('密碼輸入錯誤');
      this.pxwd.value = '';
      return false;
    }
    //儲存帳號登入資訊在LocalStorage
    const { authority, id } = content;
    this.storage.setAuth(authority); //會員權限
    this.storage.setMemberId(id); //會員編號

    return true;
  }
}
