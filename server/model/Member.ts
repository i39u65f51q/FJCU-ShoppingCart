import { SQLStatement, SQL as sql } from 'sql-template-strings';
import { MemberDto } from '../dto/Member.dto';
import { SQL } from '../sql/sql';

export class MemberModel {
  constructor() {}

  async getAuth(account: string): Promise<MemberDto | null> {
    const sqlString: SQLStatement = sql`SELECT * FROM member WHERE account == ${account}`;
    const res: unknown | unknown[] = await new SQL().query(sqlString);
    if (Array.isArray(res)) return null;
    console.log(res);
    return new MemberDto(res);
  }

  async getAll(): Promise<MemberDto[]> {
    const sqlString: SQLStatement = sql`SELECT * FROM member`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    if (!Array.isArray(data)) return [];
    return data.map((d: unknown) => new MemberDto(d));
  }

  async get(id: number): Promise<MemberDto | null> {
    const sqlString: SQLStatement = sql`SELECT * FROM member WHERE m_id == ${id}`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    if (Array.isArray(data)) return null;
    return new MemberDto(data);
  }

  async insert(member: MemberDto) {
    const sqlString: SQLStatement = sql`INSERT INTO member (m_name, phone, account, password, authority) VALUES (${member.name}, ${member.phone}, ${member.account}, ${member.password}, 1);`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    //TODO:
    return true;
  }

  async update(member: MemberDto) {
    const sqlString: SQLStatement = sql`UPDATE member SET phone = ${member.phone}, password = ${member.password}, m_name = ${member.name} WHERE m_id = ${member.id};`;
    const data: unknown | unknown[] = await new SQL().query(sqlString);
    //TODO:
    return true;
  }
}
