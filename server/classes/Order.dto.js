export class OrderDto {
  constructor(payload) {
    this.name = payload.memberId;
  }
}
