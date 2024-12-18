import connection from "./connection.js";
import sql from "mssql";

async function startJobTableUsers(job) {
  const pool = await connection.openConnection();

  try {

    const query = `INSERT INTO JOBS (NOME, DATA_HORA, TABELA, CAMINHO, ACAO, STATUS_JOB) 
    OUTPUT INSERTED.ID, INSERTED.NOME, INSERTED.DATA_HORA, INSERTED.TABELA, INSERTED.CAMINHO, INSERTED.ACAO, 
    INSERTED.STATUS_JOB VALUES (@NOME, @DATA_HORA, @TABELA, @CAMINHO, @ACAO, @STATUS_JOB)`;

    const result = await pool
      .request()
      .input("NOME", sql.NVarChar, job.name)
      .input("DATA_HORA", sql.NVarChar, job.startTime)
      .input("TABELA", sql.NVarChar, job.table)
      .input("CAMINHO", sql.NVarChar, job.path)
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

async function updateJob(id, amountRecords, status) {
  const pool = await connection.openConnection();  // Abre a conexão

  try {
    // 1. Verificar se existe algum job "executando"
    const checkQuery = `SELECT ID FROM JOBS WHERE STATUS_JOB = 'em execução'`;
    const jobsExecuting = await pool.request().query(checkQuery);

    // 2. Atualizar jobs em execução para "processado"
    if (jobsExecuting.recordset.length > 0) {
      const idsToUpdate = jobsExecuting.recordset.map((job) => job.ID).join(", ");
      const updateExecutingJobs = `
     UPDATE JOBS 
     SET STATUS_JOB = 'processado' 
     WHERE ID IN (${idsToUpdate})
   `;
      await pool.request().query(updateExecutingJobs);
    }

    // 3. Atualizar o job atual
    const query = `UPDATE JOBS SET ACAO = '${amountRecords}', STATUS_JOB = '${status}' 
 OUTPUT INSERTED.ID, INSERTED.NOME, INSERTED.DATA_HORA, INSERTED.TABELA, 
 INSERTED.CAMINHO, INSERTED.ACAO, INSERTED.STATUS_JOB WHERE ID = ${Number(id)}`;

    const result = await pool.request().query(query);

    return result.recordsets[0];

  } catch (error) {
    console.log(`Erro ao executar a consulta ${error.message}`);
    throw error;  // Repassa o erro para ser tratado em outro lugar
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}



async function searchUsersOnStage(table, storeCode) {
  const pool = await connection.openConnection();

  try {
    const query = `SELECT * FROM STAGE WHERE (TABELA ='${table}' AND CODIGO_LOJA = '${storeCode}' AND STAGE_STATUS = 1)`;

    const result = await pool.request().query(query);

    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error.message}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

async function searchUsersInTableUsers(id, table) {
  const pool = await connection.openConnection();

  try {
    const query = `SELECT * FROM ${table} WHERE ${id}`;

    const result = await pool.request().query(query);

    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta teste searchUsersInTableUsers${error.message}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

async function updateStageStatus(id) {
  const pool = await connection.openConnection();

  try {
    const dateProcessed = new Date().toISOString();
    const query = `UPDATE STAGE SET STAGE_STATUS = 2, DATA_PROCESSADO = '${dateProcessed}' WHERE STAGE_ID = ${id}`;

    const result = await pool.request().query(query);

    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error.message}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

export default {
  startJobTableUsers,
  updateJob,
  searchUsersOnStage,
  searchUsersInTableUsers,
  updateStageStatus,
};
