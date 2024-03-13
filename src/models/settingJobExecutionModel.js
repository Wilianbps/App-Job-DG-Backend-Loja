import connection from "./connection.js";

async function updateSettingJobExecution(setttings) {
  const pool = await connection.openConnection();

  try {
    const query = `UPDATE CONFIG_EXECUCAO_JOBS SET STATUS_EXECUCAO = ${setttings.status}, INTERVALO_EXECUCAO = ${setttings.interval} OUTPUT INSERTED.STATUS_EXECUCAO AS status, INSERTED.INTERVALO_EXECUCAO AS interval`;

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
    const query = `SELECT STATUS_EXECUCAO as status, INTERVALO_EXECUCAO as interval FROM CONFIG_EXECUCAO_JOBS`;

    const result = await pool.request().query(query);

    return result.recordsets[0];
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

export default { updateSettingJobExecution, selectSettingJobExecution };
