"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _connection = _interopRequireDefault(require("./connection.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function selectActiveTablesStore(table) {
  const pool = await _connection.default.openConnection();
  try {
    const query = await pool.request().query(`SELECT ID_STAGE_TABLES AS id, NOME_TABELA AS tableName, ORDEM AS orderTable, STATUS AS status, TIPO AS type FROM STAGE_TABLES WHERE STATUS = ${parseInt(table.status)} AND TIPO = '${table.type}'`);
    const tables = query.recordsets[0];
    return tables;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error.message}`);
  } finally {
    await _connection.default.closeConnection(pool);
    console.log("Conexão fechada");
  }
}
var _default = exports.default = {
  selectActiveTablesStore
};