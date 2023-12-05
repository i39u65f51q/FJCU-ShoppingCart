//508062334 陳彥志
import { GET, POST, PATCH, DELETE } from './fetch.js';

const apiUrl = 'http://localhost:3000/api/';

/* 會員 */
export async function checkAuth(payload) {
  return await POST(apiUrl + 'auth', payload);
}
export async function getMembers() {
  return await GET(apiUrl + 'members');
}
export async function getMember(memberId) {
  return await GET(apiUrl + 'member/' + memberId);
}
export async function addMember(payload) {
  return await POST(apiUrl + 'member', payload);
}
export async function updateMember(payload) {
  return await PATCH(apiUrl + 'member', payload);
}

/* 商品 */
export async function getProducts() {
  return await GET(apiUrl + 'product');
}
export async function addProduct(payload) {
  return await POST(apiUrl + 'product', payload);
}
export async function updateProduct(payload) {
  return await PATCH(apiUrl + 'product', payload);
}
export async function deleteProduct(id) {
  return await DELETE(apiUrl + 'product/' + id);
}

/* 訂單 */
export async function getOrders() {
  return await GET(apiUrl + 'order');
}
export async function getOrder(memberId) {
  return await GET(apiUrl + 'order/' + memberId);
}
export async function addOrder(payload) {
  return await POST(apiUrl + 'order', payload);
}
export async function updateOrder(payload) {
  return await PATCH(apiUrl + 'order', payload);
}
export async function deleteOrder(id) {
  return await DELETE(apiUrl + 'order/' + id);
}

/* 運送方式 */
export async function getDeliveryMethod() {
  return await GET(apiUrl + 'delivery');
}
/* 付款方式 */
export async function getTransactionType() {
  return await GET(apiUrl + 'transaction');
}
/* 訂單產品 */
export async function getOrderProducts() {
  return await GET(apiUrl + 'order-product');
}
export async function getOrderProduct(memberId) {
  return await GET(apiUrl + 'order-product/' + memberId);
}
