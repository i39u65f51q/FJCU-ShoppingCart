//508062334 陳彥志
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
    this.router = new RouterService();
    this.member = new MemberService();
    this.storage = new StorageService();
    this.registerHandler(container); //監聽註冊按鈕點擊事件
    this.submitHandler(container); //監聽Form事件
  }
  submitHandler(container) {
    const form = container.querySelector('.form');
    const account = container.querySelector('.account');
    const pxwd = container.querySelector('.pxwd');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      //帳密欄位檢查
      if (!this.checkValue(account, pxwd)) {
        alert('帳號或密碼不得為空');
        return;
      }
      //登入驗證
      const success = await this.isLoginSuccess(account, pxwd);
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
  registerHandler(container) {
    const register = container.querySelector('.register');
    register.addEventListener('click', e => {
      e.preventDefault();
      this.router.toRegister();
    });
  }
  checkValue(account, pxwd) {
    return account.value !== '' && pxwd.value !== '';
  }
  async isLoginSuccess(account, pxwd) {
    const payload = {
      account: account.value,
      password: pxwd.value,
    };
    const content = await this.member.checkAuth(payload);
    //帳號尚未申請
    if (content.length === 0) {
      alert('此帳號尚未申請');
      reset();
      return false;
    }
    //密碼輸入錯誤
    if (content.password !== pxwd.value) {
      alert('密碼輸入錯誤');
      pxwd.value = '';
      return false;
    }
    //儲存帳號登入資訊在LocalStorage
    const { authority, id } = content;
    this.storage.setAuth(authority); //會員權限
    this.storage.setMemberId(id); //會員編號

    return true;
  }
}
