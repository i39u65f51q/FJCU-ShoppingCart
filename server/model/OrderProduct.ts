import { SQLStatement, SQL as sql } from 'sql-template-strings';
import { OrderProductDto } from '../dto/OrderProduct.dto';
import { SQL } from '../sql/sql';

export class OrderProductModel {
  constructor() {}

  public async getAll(): Promise<OrderProductDto[]> {
    const sqlString: SQLStatement = sql`SELECT o.*, op.* FROM order as o JOIN orderproduct as op ON o.o_id = op.o_id;`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    if (!Array.isArray(data)) return [];
    return data.map((d: unknown) => new OrderProductDto(d));
  }

  public async get(memberId: number): Promise<OrderProductDto[]> {
    const sqlString: SQLStatement = sql`SELECT * FROM (o.*, op.* FROM order as o JOIN orderproduct as op ON o.o_id = op.o_id;) WHERE m_id == ${memberId}`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    if (!Array.isArray(data)) return [];
    return data.map((d: unknown) => new OrderProductDto(d));
  }
  //TODO:
  public async insert(data: OrderProductDto): Promise<boolean> {
    return true;
  }
}
