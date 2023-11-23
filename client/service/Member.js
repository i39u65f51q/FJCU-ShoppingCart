import * as fetch from '../lib/fetch.js';
import * as storage from '../lib/localstorage.js';

//data:[{id:number, name:string, phone:string, account:string, password:string, authority:number }]
export async function getMembers() {
  const res = await fetch.getMembers();
  const { success, content } = res;
  if (!success) return [];
  return content;
}

export async function getMember(memberId) {
  const res = await fetch.getMember(memberId);
  const { success, content } = res;
  if (!success) return null;
  return content;
}

//payload:{id:number, name:string, phone:string, account:string, password:string, authority:number }
export async function updateMember(payload) {
  const res = await fetch.updateMember(payload);
  const { success } = res;
  return success;
}

export async function addMember(payload) {
  const res = await fetch.addMember(payload);
  const { success } = res;
  return success;
}

//data:{account:string, password:string}; 回傳boolean
export async function checkAuth(payload) {
  const result = await fetch.checkAuth(payload);
  const { success, content } = result;
  if (!success) return false;
  const { authority, id } = content;
  storage.setAuth(authority); //會員權限
  storage.setMemberId(id); //會員編號
  return true;
}
