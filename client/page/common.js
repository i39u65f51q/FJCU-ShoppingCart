export function toLogin() {
  window.location.href = '../login/index.html';
}

export function toMain() {
  window.location.href = '../main/index.html';
}

export function toOrder() {
  window.location.href = '../order/index.html';
}

export function toRegister() {
  window.location.href = '../register/index.html';
}

export function toManager() {
  window.location.href = '../manager/index.html';
}

export function toMember() {
  window.location.href = '../member/index.html';
}

export function toOrderManager() {
  window.location.href = '../order-manager/index.html';
}

export function toProduct() {
  window.location.href = '../product/index.html';
}

export function routerEvent() {
  const main = document.querySelector('.main-page');
  if (main) {
    main.addEventListener('click', () => {
      toMain();
    });
  }
  const order = document.querySelector('.order-page');
  if (order) {
    order.addEventListener('click', () => {
      toOrder();
    });
  }
  const manage = document.querySelector('.manage-page');
  if (manage) {
    manage.addEventListener('click', () => {
      toManager();
    });
  }
  const member = document.querySelector('.member-page');
  if (member) {
    member.addEventListener('click', () => {
      toMember();
    });
  }
  const orderManager = document.querySelector('.order-manage-page');
  if (orderManager) {
    orderManager.addEventListener('click', () => {
      toOrderManager();
    });
  }
}
