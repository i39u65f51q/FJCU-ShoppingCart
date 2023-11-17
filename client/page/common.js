export const cartItems = [{ id: 1, name: 'test' }];

export function addItems(data) {
  cartItems.push(data);
}

export function removeItems(id) {
  const index = cartItems.findIndex(item => item.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
}

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
