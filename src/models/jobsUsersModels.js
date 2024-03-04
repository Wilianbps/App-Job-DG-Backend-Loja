import connection from "./connection.js";
import sql from "mssql";

async function startJobTableUsers(job) {
  const pool = await connection.openConnection();

  try {
    /*  const query =
      "INSERT INTO JOBS (NOME, DATA_HORA, TABELA, ACAO, STATUS_JOB) VALUES (@NOME, @DATA_HORA, @TABELA, @ACAO, @STATUS_JOB)"; */

    const query = `INSERT INTO JOBS (NOME, DATA_HORA, TABELA, ACAO, STATUS_JOB) 
    OUTPUT INSERTED.ID, INSERTED.NOME, INSERTED.DATA_HORA, INSERTED.TABELA, INSERTED.ACAO, 
    INSERTED.STATUS_JOB VALUES (@NOME, @DATA_HORA, @TABELA, @ACAO, @STATUS_JOB)`;

    const result = await pool
      .request()
      .input("NOME", sql.NVarChar, job.name)
      .input("DATA_HORA", sql.NVarChar, job.startTime)
      .input("TABELA", sql.NVarChar, job.table)
      .input("ACAO", sql.NVarChar, job.action)
      .input("STATUS_JOB", sql.NVarChar, job.status)
      .query(query);

    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

async function updateJob(id, status) {
  const pool = await connection.openConnection();
  try {
    const query = `UPDATE JOBS SET STATUS_JOB = '${status}' OUTPUT INSERTED.ID, INSERTED.NOME, INSERTED.DATA_HORA, INSERTED.TABELA, INSERTED.ACAO, 
    INSERTED.STATUS_JOB WHERE ID = ${Number(id)}`;
    const result = await pool.request().query(query);
    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error.message}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

export default { startJobTableUsers, updateJob };
