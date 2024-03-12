import connection from "./connection.js";

async function insertSettingJobExecution(settting) {
  const pool = await connection.openConnection();

  try {
    const query = `INSERT INTO CONFIG_EXECUCAO_JOBS (STATUS_EXECUCAO, INTERVALO_EXECUCAO) VALUES (${settting.status}, ${settting.executionInterval})`;

    const result = await pool.request().query(query);

    return result.recordsets[0];
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

async function selectSettingJobExecution() {
  const pool = await connection.openConnection();
  try {
    const query = `SELECT STATUS_EXECUCAO as status, INTERVALO_EXECUCAO as executionInterval FROM CONFIG_EXECUCAO_JOBS`;

    const result = await pool.request().query(query);

    return result.recordsets[0];
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

export default { insertSettingJobExecution, selectSettingJobExecution };
