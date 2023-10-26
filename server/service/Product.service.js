import { ProductDto } from '../classes/Product.dto.js';
import { ProductModel } from '../model/Products.js';

export class ProductService {
  constructor() {
    this.model = new ProductModel();
  }

  async getAll() {
    this.model
      .get()
      .then(data => {
        const response = data.map(item => new ProductDto(item));
        return { success: true, statusCode: 200, message: response };
      })
      .catch(err => {
        return { success: false, statusCode: 500, message: err.message };
      });
  }

  async get(id) {
    if (!id) return { success: true, statusCode: 400, message: 'Bad Request' };

    this.model
      .get(id)
      .then(data => {
        const response = data.map(item => new ProductDto(item));
        return { success: true, statusCode: 200, message: response };
      })
      .catch(err => {
        return { success: false, statusCode: 500, message: err.message };
      });
  }

  async insert(payload) {
    if (!payload['id'] || !payload['name'] || !payload['mobilePhone'])
      return { success: true, statusCode: 400, message: 'Bad Request' };

    const p = new ProductDto(payload);
    const res = await this.model.insert(p);
    if (res) return { success: true, statusCode: 200, message: 'OK' };
    else return { success: false, statusCode: 500, message: 'Request Failed' };
  }

  async update(payload) {
    if (!payload['id']) return { success: true, statusCode: 400, message: 'Bad Request' };

    const p = new ProductDto(payload);
    const res = await this.model.update(p);
    if (res) return { success: true, statusCode: 200, message: 'OK' };
    else return { success: false, statusCode: 500, message: 'Request Failed' };
  }

  async delete(id) {
    if (!id) return { success: false, statusCode: 400, message: 'Bad Request' };

    const res = await this.model.delete(id);
    if (res) return { success: true, statusCode: 200, message: 'OK' };
    else return { success: false, statusCode: 500, message: 'Request Failed' };
  }
}
