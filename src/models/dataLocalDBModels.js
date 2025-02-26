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

	const identifyOn = `SET IDENTITY_INSERT ${data.table} ON;`;
	const identifyOff = `SET IDENTITY_INSERT ${data.table} OFF;`;

	let attempt = 0;
	const maxAttempts = 3;
	const retryDelay = 2000; // 2 segundos de delay entre tentativas
    
	while (attempt < maxAttempts) {
	try {
		
		const { stageId, type, table, whereId, ...copyData } = data;

		const query = `${identifyOn} INSERT INTO ${data.table} (${Object.keys(
		  copyData
		).join(", ")}) VALUES (${Object.values(copyData)
		  .map((value) => (value === null ? 'NULL' : `'${value}'`))
		  .join(", ")}) ${identifyOff}`;

		  const result = await pool.request().query(query);
		  console.log(query)    
		  console.log("Resultado:", result);


			return result;
		  } catch (error) {
			  if (error.code === "40001" || error.message.includes("deadlock")) {
				console.warn(`Deadlock detectado. Tentativa ${attempt + 1} de ${maxAttempts}`);
				attempt++;

				if (attempt < maxAttempts) {
				  // Delay de 2 segundos antes de tentar novamente
				  await new Promise(resolve => setTimeout(resolve, retryDelay));
				} else {
				  console.error("Número máximo de tentativas de retry atingido.");
				  throw new Error('Falha após múltiplas tentativas devido a deadlock');
				}
			  } else {
				console.error("Erro inesperado:", error);
				throw error;
			  }
			}
	}
  
}




async function updateDataInTable(data) {
  const pool = await connection.openConnection();

  try {

    const { stageId, type, table, whereId, ...copyData } = data;

    const keys = Object.keys(copyData);
    const values = Object.values(copyData);
    let updateValues = "";

    // Construir a string para a parte SET do update
    for (let i = 1; i < keys.length; i++) {
   
      updateValues += `${keys[i]} = '${values[i]}'`;
      if (i !== keys.length - 1) {
        updateValues += ", ";
      }
    }

    const query = `UPDATE ${data.table} SET ${updateValues} WHERE ${whereId}`;
    const result = await pool.request().query(query);

    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

export default { insertDataInTable, updateDataInTable, getUsers };
