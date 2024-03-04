import sql from "mssql";
import config from "../configs/config.js";

async function openConnection() {
  const pool = await sql.connect(config);
  return pool;
}

async function closeConnection(pool) {
  await pool.close();
}

export default { openConnection, closeConnection };
