export class ProductDto {
  constructor(payload) {
    this.id = payload.id;
    this.name = payload.name;
    this.price = payload.price;
  }
}
