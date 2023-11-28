import { SQLStatement, SQL as sql } from 'sql-template-strings';
import { MemberDto } from '../dto/Member.dto';
import { SQL } from '../sql/sql';

export class MemberModel {
  constructor() {}

  async getAuth(member: MemberDto): Promise<MemberDto[] | null> {
    const sqlString: SQLStatement = sql`SELECT * FROM new_schema.member WHERE account = ${member.account}`;
    const res: unknown | unknown[] = await new SQL().query(sqlString);
    // console.log('res', res);
    return (res as unknown[]).map((data: unknown) => new MemberDto(data));
  }

  async getAll(): Promise<MemberDto[]> {
    const sqlString: SQLStatement = sql`SELECT * FROM new_schema.member;`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    if (!Array.isArray(data)) return [];
    return data.map((d: unknown) => new MemberDto(d));
  }

  async get(id: number): Promise<MemberDto[]> {
    const sqlString: SQLStatement = sql`SELECT * FROM new_schema.member WHERE m_id = ${id}`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    if (!Array.isArray(data)) return [];
    return data.map((d: unknown) => new MemberDto(d));
  }

  async insert(member: MemberDto): Promise<number> {
    const sqlString: SQLStatement = sql`INSERT INTO new_schema.member (m_name, phone, account, password, authority) VALUES (${member.name}, ${member.phone}, ${member.account}, ${member.password}, 1);`;
    const result: unknown | unknown[] = await new SQL().query(sqlString);
    const insertId: number = (result as any).insertId;
    if (Array.isArray(result)) return -1;
    return insertId;
  }

  async update(member: MemberDto): Promise<boolean> {
    const sqlString: SQLStatement = sql`UPDATE new_schema.member SET phone = ${member.phone}, password = ${member.password}, m_name = ${member.name} WHERE account = ${member.account};`;
    const result: unknown | unknown[] = await new SQL().query(sqlString);
    return (result as any).affectedRows > 0 ? true : false;
  }
}
