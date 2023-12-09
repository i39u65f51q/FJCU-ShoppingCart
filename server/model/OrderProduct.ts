//508062334 陳彥志 , 511172176 李則霖
import { SQLStatement, SQL as sql } from 'sql-template-strings';
import { OrderProductDto } from '../dto/OrderProduct.dto';
import { SQL } from '../sql/sql';

export class OrderProductModel {
  constructor() {}

  public async getAll(): Promise<OrderProductDto[]> {
    const sqlString: SQLStatement = sql`SELECT * FROM buygo.orderproduct`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    if (!Array.isArray(data)) return [];
    return data.map((d: unknown) => new OrderProductDto(d));
  }

  public async get(memberId: number): Promise<OrderProductDto[]> {
    const sqlString: SQLStatement = sql`SELECT op.* FROM buygo.orderproduct as op JOIN buygo
    .order as o WHERE op.o_id = o.o_id AND o.m_id = ${memberId}`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    if (!Array.isArray(data)) return [];
    return data.map((d: unknown) => new OrderProductDto(d));
  }

  public async insert(data: OrderProductDto): Promise<number> {
    const sqlString: SQLStatement = sql`INSERT INTO buygo.orderproduct (o_id, p_id, orderquantity, orderpriceperitem, productquantity) VALUES (${data.orderId}, ${data.productId}, 0, ${data.eachProductPrice}, ${data.quantity})`;
    const result: unknown | unknown[] = await new SQL().query(sqlString);
    return (result as any).affectedRows > 0 ? true : false;
  }
}
