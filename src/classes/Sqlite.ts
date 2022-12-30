import DatabaseConstructor, { Database, Statement } from "better-sqlite3";
import { join } from "path";
import { readFileSync } from "fs";

export default class Sqlite
{
	private static _instance: Sqlite;

	db: Database;
	static dbfile = join(__dirname, "..", "..", "db", "data.db");
	static setupFile = join(__dirname, "..", "..", "db", "setup.sql");

	constructor()
	{
		this.db = new DatabaseConstructor(Sqlite.dbfile);
	}

	public static get instance()
	{
		return this._instance || (this._instance = new this());
	}

	public static prepare(query: string): Statement
	{
		const statement = this.instance.db.prepare(query);
		return statement;
	}

	public static setup()
	{
		const setupQuery = readFileSync(Sqlite.setupFile, "utf8");
		this.instance.db.exec(setupQuery);
	}
}
