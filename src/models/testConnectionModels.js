/* import config from "../config.js";
import sql from "mssql";

async function testConnectionDatabase() {
  try {
    const pool = await sql.connect(config);
    console.log("Conexão com o banco de dados bem-sucedida!");
    await pool.close(); // Fecha a conexão
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);
    throw error;
  } finally {
    console.log("Conexão encerrada.");
  }
}

export default { testConnectionDatabase };
 */

import config from "../config.js";
import sql from "mssql";

async function testConnectionDatabase() {

    try {
      await sql.connect(config);
    } catch (error) {
      throw error;
    } finally {
      await sql.close();
      console.log("Conexão fechada");
    }

}

export default { testConnectionDatabase };