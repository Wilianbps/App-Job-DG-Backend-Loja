import connection from "./connection.js";

async function getJobs() {
  const pool = await connection.openConnection();
  try {
    const jobs = await pool.request().query("SELECT * FROM JOBS ORDER BY DATA_HORA DESC");
    return jobs;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error.message}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

async function getJobsByDate(startTime) {
  const pool = await connection.openConnection();
  try {
    const result = await pool
      .request()
      .query(
        `SELECT ID AS id, 
          NOME AS name, 
          DATA_HORA AS startTime, 
          TABELA AS [table], 
          ACAO AS action, 
          CAMINHO AS path, 
          STATUS_JOB AS status FROM JOBS WHERE CONVERT(DATE, CONVERT(DATETIME, DATA_HORA, 127)) = '${startTime}' ORDER BY DATA_HORA DESC;`
      );

    return result.recordset;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error.message}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

export default { getJobs, getJobsByDate };
