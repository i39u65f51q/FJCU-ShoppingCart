import * as api from '../api/api.js';

export class MemberService {
  constructor() {}

  async getMembers() {
    const res = await api.getMembers();
    const { success, content } = res;
    if (!success) return [];
    return content;
  }

  async getMember(memberId) {
    const res = await api.getMember(memberId);
    const { success, content } = res;
    if (!success) return null;
    return content;
  }

  //payload:{id:number, name:string, phone:string, account:string, password:string, authority:number }
  async updateMember(payload) {
    const res = await api.updateMember(payload);
    const { success } = res;
    return success;
  }

  async addMember(payload) {
    const res = await api.addMember(payload);
    const { success, content } = res;
    return content;
  }

  //data:{account:string, password:string}; 回傳boolean
  async checkAuth(payload) {
    const result = await api.checkAuth(payload);
    const { success, content } = result;
    return content;
  }
}
