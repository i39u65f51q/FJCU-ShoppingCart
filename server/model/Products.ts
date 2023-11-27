import { SQLStatement, SQL as sql } from 'sql-template-strings';
import { ProductDto } from '../dto/Product.dto';
import { SQL } from '../sql/sql';

export class ProductModel {
  constructor() {}

  public async getAll(): Promise<ProductDto[]> {
    const sqlString: SQLStatement = sql`SELECT * FROM product`;
    const data: unknown[] | unknown = await new SQL().query(sqlString);
    if (!Array.isArray(data)) return [];
    return data.map((d: unknown) => new ProductDto(d));
  }

  public async insert(product: ProductDto): Promise<number> {
    const sqlString = sql`INSERT INTO product (p_name, price, quantity) VALUES (${product.name}, ${product.price}, ${product.quantity});`;
    const insertId: unknown[] | unknown = await new SQL().query(sqlString);
    if (Array.isArray(insertId)) return -1;
    return insertId as number;
  }

  public async update(product: ProductDto): Promise<boolean> {
    const sqlString: SQLStatement = sql`UPDATE product SET p_Name = ${product.name}, price = ${product.price}  ,quantity = ${product.quantity} WHERE p_id = ${product.id};`;
    const res: unknown[] | unknown = await new SQL().query(sqlString);
    //FIXME:
    return true;
  }

  public async delete(id: number): Promise<boolean> {
    const sqlString: SQLStatement = sql`DELETE FROM product WHERE p_id == ${id};`;
    const res: unknown[] | unknown = await new SQL().query(sqlString);
    //FIXME:
    return true;
  }
}
