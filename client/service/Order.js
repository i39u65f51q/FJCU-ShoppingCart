import * as fetch from '../lib/fetch.js';

export async function getOrders() {
  const result = await fetch.getOrders();
  const { success, content } = result;
  if (!success) return [];
  return content;
}

export async function getOrder(memberId) {
  const result = await fetch.getOrder(memberId);
  const { success, content } = result;
  if (!success) return [];
  return content;
}

//payload:{id:number,  status:number};
export async function updateOrder(payload) {
  const result = await fetch.updateOrder(payload);
  const { success } = result;
  return success;
}

export async function addOrder(payload) {
  const result = await fetch.addOrder(payload);
  const { success } = result;
  return success;
}
