export class MemberDto {
  constructor(payload) {
    this.id = payload.id;
    this.name = payload.name;
    this.mobilePhone = payload.mobilePhone;
  }
}
