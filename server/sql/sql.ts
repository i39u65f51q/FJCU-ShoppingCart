//508062334 陳彥志
import mysql, { FieldInfo, MysqlError } from 'mysql';
import { SQLStatement } from 'sql-template-strings';
import { env } from '../environment/env';

export class SQL {
  private readonly mysql: mysql.Connection;

  constructor() {
    this.mysql = mysql.createConnection({
      host: env.sql.host,
      user: env.sql.account,
      password: env.sql.password,
      database: env.sql.db,
      port: env.sql.port,
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
