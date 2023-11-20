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

  public async get(memberId: number): Promise<OrderDto | null> {
    const sqlString: SQLStatement = sql`SELECT * FROM order WHERE m_id == ${memberId}`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    if (Array.isArray(data)) return null;
    return new OrderDto(data);
  }

  public async insert(order: OrderDto) {
    const sqlString: SQLStatement = sql`INSERT INTO order (m_id, Address, Status, deliveryMethodId, transactionTypeId) VALUES (${order.memberId}, ${order.address}, 1 , ${order.deliveryId}, ${order.transactionId});`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    //TODO:
    return true;
  }

  public async update(order: OrderDto) {
    const sqlString: SQLStatement = sql`UPDATE order SET status = ${order.status};`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    //TODO:
    return true;
  }
}
