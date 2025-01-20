import sql from "mssql";
import config from "../config.js";

let pool = null; // Pool global
let connectionPromise = null; // Promise compartilhada para evitar múltiplas conexões simultâneas

async function openConnection() {
  try {
    // Reutiliza conexão existente
    if (pool && pool.connected) {
      console.log("Reutilizando conexão existente com o banco de dados.");
      return pool;
    }

    // Evita múltiplas conexões simultâneas
    if (connectionPromise) {
      console.log("Aguardando conexão existente ser estabelecida...");
      await connectionPromise;
      return pool;
    }

    // Cria uma nova conexão
    console.log("Criando nova conexão com o banco de dados...");
    connectionPromise = sql.connect(config);
    pool = await connectionPromise;

    console.log("Conexão estabelecida com sucesso.");
    return pool;
  } catch (error) {
    console.error("Erro ao abrir conexão com o banco de dados:", error.message);
    throw error;
  } finally {
    connectionPromise = null; // Libera a promise para próximas conexões
  }
}

async function closeConnection() {
  try {
    if (pool && pool.connected) {
      console.log("Fechando conexão com o banco de dados...");
      await pool.close();
      pool = null; // Reseta o pool global
    } else {
      console.log("Nenhuma conexão ativa para fechar.");
    }
  } catch (error) {
    console.error("Erro ao fechar a conexão:", error.message);
    throw error;
  }
}

function isConnected() {
  return pool && pool.connected;
}

export default { openConnection, closeConnection, isConnected };
