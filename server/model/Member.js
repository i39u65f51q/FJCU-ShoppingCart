import { Sql } from '../sql/sql.js';

export class MemberModel {
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

  async insert(memberDto) {
    const sqlString = ``;
    await this.sql.insert();
  }

  async update(memberDto) {
    const sqlString = ``;
    await this.sql.update();
  }

  async delete(id) {
    const sqlString = ``;
    await this.sql.delete();
  }
}
