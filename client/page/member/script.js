//使用者編輯會員資料頁面
import { MemberService } from '../../service/Member.js';
import { BaseModule } from '../../class/BaseModule.js';

window.addEventListener('load', () => {
  const body = document.querySelector('body');
  const module = new MemberInfoModule(body);
});

class MemberInfoModule extends BaseModule {
  constructor(container) {
    const header = container.querySelector('.header');
    super(header);
    this.member = new MemberService();
    this.form = container.querySelector('.form');
    this.name = container.querySelector('.name');
    this.account = container.querySelector('.account');
    this.pxwd = container.querySelector('.pxwd');
    this.phone = container.querySelector('.phone');
    this.renderInfo();
    this.handleFormSubmitEvent();
  }

  async renderInfo() {
    const result = await this.member.getMember(this.memberId);
    console.log(result);
    if (result) {
      this.account.textContent = result.account;
      this.pxwd.value = result.password;
      this.name.value = result.name;
      this.phone.value = result.phone;
    }
  }

  handleFormSubmitEvent() {
    this.form.addEventListener('submit', async e => {
      e.preventDefault();

      const payload = {
        account: this.account.textContent,
        password: this.pxwd.value,
        name: this.name.value,
        phone: this.phone.value,
      };

      if (!payload.password || !payload.name || !payload.phone) {
        alert('欄位不得為空');
        return;
      }
      const result = await this.member.updateMember(payload);
      if (result) {
        alert('資料變更成功');
      }
    });
  }
}
