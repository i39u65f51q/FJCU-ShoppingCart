//508062334 陳彥志
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
    this.renderUserInfo(container);
    this.submitHandler(container);
  }

  async renderUserInfo(container) {
    const result = await this.member.getMember(this.memberId);
    const name = container.querySelector('.name');
    const account = container.querySelector('.account');
    const pxwd = container.querySelector('.pxwd');
    const phone = container.querySelector('.phone');
    if (result) {
      account.textContent = result.account;
      pxwd.value = result.password;
      name.value = result.name;
      phone.value = result.phone;
    }
  }

  submitHandler(container) {
    const form = container.querySelector('.form');
    const name = container.querySelector('.name');
    const account = container.querySelector('.account');
    const pxwd = container.querySelector('.pxwd');
    const phone = container.querySelector('.phone');
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
      const result = await this.member.updateMember(payload);
      if (result) {
        alert('資料變更成功');
      }
    });
  }
}
