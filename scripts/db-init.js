import fs from "fs/promises";
import { query } from "../src/lib/db.js";

const schema = await fs.readFile("./database/schema.sql", "utf8");

await query(schema);

console.log("✅ Schema created.");
process.exit(0);
