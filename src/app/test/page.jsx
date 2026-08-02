import db from "@/lib/db";

export default async function TestPage() {
  const result = await db.query("SELECT NOW()");

  return <pre>{JSON.stringify(result.rows, null, 2)}</pre>;
}
