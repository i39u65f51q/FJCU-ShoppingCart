import { SQLStatement, SQL as sql } from 'sql-template-strings';
import { TransactionTypeDto } from '../dto/TransactionType.dto';
import { SQL } from '../sql/sql';

export class TransactionTypeModel {
  constructor() {}

  public async getAll(): Promise<TransactionTypeDto[]> {
    const sqlString: SQLStatement = sql`SELECT * FROM new_schema.transactiontype; `;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    if (!Array.isArray(data)) return [];
    return data.map((d: unknown) => new TransactionTypeDto(d));
  }
}
