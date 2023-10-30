import { getMembers, getMember, updateMember, addMember, deleteMember } from '../lib/fetch.js';

export class MemberService {
  constructor() {
    this.list = [];

    this.init();
  }

  async init() {
    this.list = await getMembers();
  }
}
