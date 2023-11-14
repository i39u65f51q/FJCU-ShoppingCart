import { getMembers, getMember, updateMember, addMember, deleteMember } from '../lib/fetch.js';

const list = [];

export async function initialize() {
  list = await getMembers();
}

export function getList() {
  return list;
}
