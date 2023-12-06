//508062334 陳彥志
//管理員編輯商品頁面
import { AUTH_MANAGER, AUTH_USER } from '../../enum/auth.js';
import { BaseModule } from '../../class/BaseModule.js';
window.addEventListener('load', () => {
  const body = document.querySelector('body');
  const module = new ProductModule(body);
});

class ProductModule extends BaseModule {
  constructor(container) {
    const header = container.querySelector('header');
    super(header);
    //如果使用者進入此頁面，導向到主頁面
    if (this.auth === AUTH_USER) {
      this.router.toMain();
      return;
    }
  }
}
