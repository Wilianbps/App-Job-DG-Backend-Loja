"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mssql = _interopRequireDefault(require("mssql"));
var _config = _interopRequireDefault(require("../config.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let pool = null; // Pool global
let isConnecting = false; // Evitar condições de corrida

async function openConnection() {
  try {
    // Evita múltiplas conexões simultâneas
    if (isConnecting) {
      console.log("Aguardando outra conexão ser estabelecida...");
      while (isConnecting) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Espera 100ms
      }
    }
    if (pool && pool.connected) {
      console.log("Conexão existente reutilizada.");
      return pool;
    }

    // Bloqueia novas conexões enquanto esta é criada
    isConnecting = true;
    console.log("Criando nova conexão com o banco de dados...");
    pool = await _mssql.default.connect(_config.default);

    // Testa a conexão com um comando simples
    await pool.request().query("SELECT 1");
    console.log("Conexão estabelecida com sucesso.");
    return pool;
  } catch (error) {
    console.error("Erro ao abrir conexão:", error.message);
    throw error; // Propaga o erro
  } finally {
    isConnecting = false; // Libera o bloqueio
  }
}
async function closeConnection() {
  try {
    if (pool && pool.connected) {
      console.log("Fechando conexão com o banco de dados...");
      await pool.close();
      pool = null; // Reseta o pool global
      console.log("Conexão fechada com sucesso.");
    } else {
      console.log("Nenhuma conexão ativa para fechar.");
    }
  } catch (error) {
    console.error("Erro ao fechar a conexão:", error.message);
    throw error;
  }
}
var _default = exports.default = {
  openConnection,
  closeConnection
};