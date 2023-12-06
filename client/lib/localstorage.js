//508062334 陳彥志
export class StorageService {
  constructor() {
    this.cart = 'carts';
    this.auth = 'auth';
    this.member = 'memberId';
  }
  setCarts(data) {
    localStorage.setItem(this.cart, JSON.stringify(data));
  }
  getCarts() {
    return JSON.parse(localStorage.getItem(this.cart));
  }
  clearCarts() {
    localStorage.removeItem(this.cart);
  }
  getAuth() {
    return JSON.parse(localStorage.getItem(this.auth));
  }
  setAuth(data) {
    localStorage.setItem(this.auth, JSON.stringify(data));
  }
  clearAuth() {
    localStorage.removeItem(this.auth);
  }
  setMemberId(data) {
    localStorage.setItem(this.member, JSON.stringify(data));
  }
  getMemberId() {
    return JSON.parse(localStorage.getItem(this.member));
  }
  clearMemberId() {
    localStorage.removeItem(this.member);
  }
  clearAll() {
    this.clearMemberId();
    this.clearAuth();
    this.clearCarts();
  }
}
