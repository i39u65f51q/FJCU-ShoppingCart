import { DeliveryMethodDto } from '../dto/DeliveryMethod.dto';
import { SQL } from '../sql/sql';
import { SQLStatement, SQL as sql } from 'sql-template-strings';
export class DeliveryMethodModel {
  constructor() {}

  public async getAll(): Promise<DeliveryMethodDto[]> {
    const sqlString: SQLStatement = sql`SELECT * FROM buygo.deliverymethod;`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    if (!Array.isArray(data)) return [];
    return data.map((d: unknown) => new DeliveryMethodDto(d));
  }
}
