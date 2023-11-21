export const cartsKey = 'carts';
export const authKey = 'auth';

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
