const cartsKey = 'carts';
const authKey = 'auth';
const memberIdKey = 'memberId';

export function setCarts(data) {
  localStorage.setItem(cartsKey, JSON.stringify(data));
}

export function getCarts() {
  return JSON.parse(localStorage.getItem(cartsKey));
}

export function clearCarts() {
  localStorage.removeItem(cartsKey);
}

export function getAuth() {
  return JSON.parse(localStorage.getItem(authKey));
}

export function setAuth(data) {
  localStorage.setItem(authKey, JSON.stringify(data));
}

export function clearAuth() {
  localStorage.removeItem(authKey);
}

export function setMemberId(data) {
  localStorage.setItem(memberIdKey, JSON.stringify(data));
}
export function getMemberId() {
  return JSON.parse(localStorage.getItem(memberIdKey));
}
export function clearMemberId() {
  localStorage.removeItem(memberIdKey);
}

export function clearAll() {
  clearMemberId();
  clearAuth();
  clearCarts();
}
