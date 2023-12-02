import mysql, { FieldInfo, MysqlError } from 'mysql';
import { SQLStatement } from 'sql-template-strings';

//FIXME:
export class SQL {
  private readonly mysql: mysql.Connection;
  constructor() {
    this.mysql = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'eric0129',
      database: 'new_schema',
      port: 3306,
    });
  }

  public async query(query: SQLStatement): Promise<unknown | unknown[]> {
    return new Promise(async (res, rej) => {
      const isConnected: boolean = await this.connect();
      if (!isConnected) return;
      this.mysql.query(query, (err: MysqlError | null, results?: any, fields?: FieldInfo[]) => {
        if (err) {
          rej(err.message);
          return;
        }
        res(results);
      });
      this.mysql.end();
    });
  }

  private async connect(): Promise<boolean> {
    return new Promise(async (res, rej) => {
      this.mysql.connect((err: MysqlError) => {
        err ? rej(false) : res(true);
      });
    });
  }
}
