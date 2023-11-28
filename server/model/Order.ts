import { SQLStatement, SQL as sql } from 'sql-template-strings';
import { OrderDto } from '../dto/Order.dto';
import { SQL } from '../sql/sql';

export class OrderModel {
  constructor() {}

  public async getAll(): Promise<OrderDto[]> {
    const sqlString: SQLStatement = sql`SELECT * FROM new_schema.order;`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    if (!Array.isArray(data)) return [];
    return data.map((d: unknown) => new OrderDto(d));
  }

  public async get(memberId: number): Promise<OrderDto[]> {
    const sqlString: SQLStatement = sql`SELECT * FROM new_schema.order WHERE m_id = ${memberId}`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    if (!Array.isArray(data)) return [];
    return data.map((d: unknown) => new OrderDto(d));
  }

  public async insert(order: OrderDto): Promise<number> {
    const sqlString: SQLStatement = sql`INSERT INTO new_schema.order (m_id, Address, Status, deliveryMethodId, transactionTypeId) VALUES (${order.memberId}, ${order.address}, 1 , ${order.deliveryId}, ${order.transactionId});`;
    const result: unknown | unknown[] = await new SQL().query(sqlString);
    const insertId: number = (result as any).insertId;
    return insertId as number;
  }

  public async update(order: OrderDto): Promise<boolean> {
    const sqlString: SQLStatement = sql`UPDATE new_schema.order SET status = ${order.status} WHERE o_id = ${order.id};`;
    const result: unknown | unknown[] = await new SQL().query(sqlString);
    return (result as any).affectedRow > 0 ? true : false;
  }
}
