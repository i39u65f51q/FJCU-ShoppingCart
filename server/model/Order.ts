import { SQLStatement, SQL as sql } from 'sql-template-strings';
import { OrderDto } from '../dto/Order.dto';
import { SQL } from '../sql/sql';

export class OrderModel {
  constructor() {}

  public async getAll(): Promise<OrderDto[]> {
    const sqlString: SQLStatement = sql`SELECT * FROM order`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    if (!Array.isArray(data)) return [];
    return data.map((d: unknown) => new OrderDto(d));
  }

  public async get(memberId: number): Promise<OrderDto[]> {
    const sqlString: SQLStatement = sql`SELECT * FROM order WHERE m_id == ${memberId}`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    if (!Array.isArray(data)) return [];
    return data.map((d: unknown) => new OrderDto(d));
  }

  public async insert(order: OrderDto): Promise<number> {
    const sqlString: SQLStatement = sql`INSERT INTO order (m_id, Address, Status, deliveryMethodId, transactionTypeId) VALUES (${order.memberId}, ${order.address}, 1 , ${order.deliveryId}, ${order.transactionId});`;
    const insertId: unknown | unknown[] = await new SQL().query(sqlString);
    if (!insertId) return -1;
    return insertId as number;
  }

  public async update(order: OrderDto): Promise<boolean> {
    const sqlString: SQLStatement = sql`UPDATE order SET status = ${order.status};`;
    const result: unknown | unknown[] = await new SQL().query(sqlString);
    if (!result) return false;
    return true;
  }
}
