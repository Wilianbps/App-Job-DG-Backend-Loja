import connection from "./connection.js";

async function getUsers() {
  const pool = await connection.openConnection();

  try {
    const query = `SELECT * FROM USUARIO_DGCS`;
    const result = await pool.request().query(query);
    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

async function insertDataInTable(data) {
  const pool = await connection.openConnection();

  const identifyOn = "SET IDENTITY_INSERT USUARIO_DGCS ON;";
  const identifyOff = "SET IDENTITY_INSERT USUARIO_DGCS OFF;";

  try {
    const { stageId, type, table, ...copyData } = data;

    const query = `${identifyOn} INSERT INTO ${data.table} (${Object.keys(
      copyData
    ).join(", ")}) VALUES (${Object.values(copyData)
      .map((value) => `'${value}'`)
      .join(", ")}) ${identifyOff}`;

    const result = await pool.request().query(query);

    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

async function updateDataInTable(data) {
  const pool = await connection.openConnection();

  const identifyOn = "SET IDENTITY_INSERT USUARIO_DGCS ON;";
  const identifyOff = "SET IDENTITY_INSERT USUARIO_DGCS OFF;";

  const { type, table, ...copyData } = data;

  console.log("copydata", copyData);
}

export default { insertDataInTable, updateDataInTable, getUsers };
