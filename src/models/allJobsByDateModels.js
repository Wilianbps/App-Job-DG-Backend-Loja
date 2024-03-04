import connection from "./connection.js";

async function getJobs() {
  const pool = await connection.openConnection();
  try {
    const jobs = await pool.request().query("SELECT * FROM JOBS");
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
        `SELECT * FROM [DGCS_ENTBIP].[dbo].[JOBS] WHERE CONVERT(DATE, CONVERT(DATETIME, DATA_HORA, 127)) = '${startTime}';`
      );
    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error.message}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

export default { getJobs, getJobsByDate };
