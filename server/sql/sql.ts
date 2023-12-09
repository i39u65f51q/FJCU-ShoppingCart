//508062334 陳彥志
import mysql, { FieldInfo, MysqlError } from 'mysql';
import { SQLStatement } from 'sql-template-strings';

export class SQL {
  private readonly mysql: mysql.Connection;
  constructor() {
    this.mysql = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'buygo',
      port: 3306,
    });
  }

  public query(query: SQLStatement): Promise<unknown | unknown[]> {
    return new Promise((resolve, reject) => {
      this.mysql.connect((err: MysqlError) => {
        if (err) {
          reject(err);
          return;
        }
        this.mysql.query(query, (error: MysqlError | null, results?: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
        this.mysql.end();
      });
    });
  }
}
