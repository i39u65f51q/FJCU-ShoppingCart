export const cartsKey = 'carts';
export const tokenKey = 'token';

export function setCarts(data) {
  localStorage.setItem(cartsKey, JSON.stringify(data));
}

export function getCarts() {
  return JSON.parse(localStorage.getItem(cartsKey));
}

export function deleteCarts() {
  localStorage.removeItem(cartsKey);
}

export function getToken() {
  return JSON.parse(localStorage.getItem(tokenKey));
}

export function setToken(token) {
  localStorage.setItem(tokenKey, JSON.stringify(token));
}

export function deleteToken() {
  localStorage.removeItem(tokenKey);
}
