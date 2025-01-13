"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _connection = _interopRequireDefault(require("./connection.js"));
var _mssql = _interopRequireDefault(require("mssql"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function startJobTableUsers(job) {
  const pool = await _connection.default.openConnection();
  try {
    const query = `INSERT INTO JOBS (NOME, DATA_HORA, TABELA, CAMINHO, ACAO, STATUS_JOB) 
    OUTPUT INSERTED.ID, INSERTED.NOME, INSERTED.DATA_HORA, INSERTED.TABELA, INSERTED.CAMINHO, INSERTED.ACAO, 
    INSERTED.STATUS_JOB VALUES (@NOME, @DATA_HORA, @TABELA, @CAMINHO, @ACAO, @STATUS_JOB)`;
    const result = await pool.request().input("NOME", _mssql.default.NVarChar, job.name).input("DATA_HORA", _mssql.default.NVarChar, job.startTime).input("TABELA", _mssql.default.NVarChar, job.table).input("CAMINHO", _mssql.default.NVarChar, job.path).input("ACAO", _mssql.default.NVarChar, job.action).input("STATUS_JOB", _mssql.default.NVarChar, job.status).query(query);
    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error}`);
  } finally {
    await _connection.default.closeConnection(pool);
    console.log("Conexão fechada");
  }
}
async function updateJob(id, amountRecords, status) {
  const pool = await _connection.default.openConnection(); // Abre a conexão

  try {
    // 1. Verificar se existe algum job "executando"
    const checkQuery = `SELECT ID FROM JOBS WHERE STATUS_JOB = 'em execução'`;
    const jobsExecuting = await pool.request().query(checkQuery);

    // 2. Atualizar jobs em execução para "processado"
    if (jobsExecuting.recordset.length > 0) {
      const idsToUpdate = jobsExecuting.recordset.map(job => job.ID).join(", ");
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
    throw error; // Repassa o erro para ser tratado em outro lugar
  } finally {
    await _connection.default.closeConnection(pool);
    console.log("Conexão fechada");
  }
}
async function searchUsersOnStage(table, storeCode) {
  const pool = await _connection.default.openConnection();
  try {
    const query = `SELECT * FROM STAGE WHERE (TABELA ='${table}' AND CODIGO_LOJA = '${storeCode}' AND STAGE_STATUS = 1)`;
    const result = await pool.request().query(query);
    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error.message}`);
  } finally {
    await _connection.default.closeConnection(pool);
    console.log("Conexão fechada");
  }
}
async function searchUsersInTableUsers(id, table) {
  const pool = await _connection.default.openConnection();
  try {
    const query = `SELECT * FROM ${table} WHERE ${id}`;
    const result = await pool.request().query(query);
    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta teste searchUsersInTableUsers${error.message}`);
  } finally {
    await _connection.default.closeConnection(pool);
    console.log("Conexão fechada");
  }
}
async function updateStageStatus(id) {
  const pool = await _connection.default.openConnection();
  try {
    const dateProcessed = new Date().toISOString();
    const query = `UPDATE STAGE SET STAGE_STATUS = 2, DATA_PROCESSADO = '${dateProcessed}' WHERE STAGE_ID = ${id}`;
    const result = await pool.request().query(query);
    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error.message}`);
  } finally {
    await _connection.default.closeConnection(pool);
    console.log("Conexão fechada");
  }
}
var _default = exports.default = {
  startJobTableUsers,
  updateJob,
  searchUsersOnStage,
  searchUsersInTableUsers,
  updateStageStatus
};