import { Sql } from '../sql/sql.js';

export class OrderModel {
  constructor() {
    this.sql = new Sql();
  }

  async getAll() {
    const sqlString = ``;
    await this.sql.getAll();
  }

  async get(id) {
    const sqlString = ``;
    await this.sql.get();
  }

  async insert(orderDto) {
    const sqlString = ``;
    await this.sql.insert();
  }

  async update(orderDto) {
    const sqlString = ``;
    await this.sql.update();
  }

  async delete(id) {
    const sqlString = ``;
    await this.sql.delete();
  }
}
