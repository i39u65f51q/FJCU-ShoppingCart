//508062334 陳彥志 , 511172176 李則霖
import { SQLStatement, SQL as sql } from 'sql-template-strings';
import { ProductDto } from '../dto/Product.dto';
import { SQL } from '../sql/sql';

export class ProductModel {
  constructor() {}

  public async getAll(): Promise<ProductDto[]> {
    const sqlString: SQLStatement = sql`SELECT * FROM product `;
    const data: unknown[] | unknown = await new SQL().query(sqlString);
    if (!Array.isArray(data)) return [];
    return data.map((d: unknown) => new ProductDto(d));
  }

  public async insert(product: ProductDto): Promise<number> {
    const sqlString = sql`INSERT INTO product (p_name, price, quantity, disabled) VALUES (${product.name}, ${product.price}, ${product.quantity} , 0);`;
    const result: unknown[] | unknown = await new SQL().query(sqlString);
    const insertId: number = (result as any).insertId;
    return insertId;
  }

  public async update(product: ProductDto): Promise<boolean> {
    const sqlString: SQLStatement = sql`UPDATE product SET p_name = ${product.name}, quantity = ${product.quantity}, price = ${product.price} WHERE p_id = ${product.id};`;
    const result: unknown[] | unknown = await new SQL().query(sqlString);
    return (result as any).affectedRows > 0 ? true : false;
  }

  public async updateQuantity(product: ProductDto): Promise<boolean> {
    const sqlString: SQLStatement = sql`UPDATE product SET quantity = ${product.quantity} WHERE p_id = ${product.id};`;
    const result: unknown[] | unknown = await new SQL().query(sqlString);
    return (result as any).affectedRows > 0 ? true : false;
  }

  public async delete(id: number): Promise<boolean> {
    const sqlString: SQLStatement = sql`UPDATE product SET disabled = 1 WHERE p_id = ${id};`;
    const result: unknown[] | unknown = await new SQL().query(sqlString);
    return (result as any).affectedRows > 0 ? true : false;
  }
}
