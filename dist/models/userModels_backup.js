"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _connection = _interopRequireDefault(require("./connection.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function getUsers() {
  const pool = await _connection.default.openConnection();
  try {
    const query = `SELECT * FROM USUARIO_DGCS`;
    const result = await pool.request().query(query);
    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error}`);
  } finally {
    await _connection.default.closeConnection(pool);
    console.log("Conexão fechada");
  }
}
async function insertDataInTable(dataUsers) {
  const pool = await _connection.default.openConnection();
  const identifyOn = "SET IDENTITY_INSERT USUARIO_DGCS ON;";
  const identifyOff = "SET IDENTITY_INSERT USUARIO_DGCS OFF;";
  try {
    const query = `${identifyOn} INSERT INTO USUARIO_DGCS (ID_USUARIO_DGCS, NOME_COMPLETO, 
      CPF, EMAIL, PERFIL_ACESSO, LOGIN_USUARIO, SENHA, SITUACAO, DATA_CRIACAO, CODIGO_LOJA) 
      VALUES (${dataUsers.ID_USUARIO_DGCS}, '${dataUsers.NOME_COMPLETO}', '${dataUsers.CPF}', '${dataUsers.EMAIL}', 
      '${dataUsers.PERFIL_ACESSO}', '${dataUsers.LOGIN_USUARIO}', '${dataUsers.SENHA}', ${dataUsers.SITUACAO}, 
      '${dataUsers.DATA_CRIACAO}', '${dataUsers.CODIGO_LOJA}') ${identifyOff}`;
    const result = await pool.request().query(query);
    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error}`);
  } finally {
    await _connection.default.closeConnection(pool);
    console.log("Conexão fechada");
  }
}
async function updateDataInTable(data) {
  const pool = await _connection.default.openConnection();
  const identifyOn = "SET IDENTITY_INSERT USUARIO_DGCS ON;";
  const identifyOff = "SET IDENTITY_INSERT USUARIO_DGCS OFF;";
  const {
    type,
    table,
    ...copyData
  } = data;
}
var _default = exports.default = {
  insertDataInTable,
  updateDataInTable,
  getUsers
};