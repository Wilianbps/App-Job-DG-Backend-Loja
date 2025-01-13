"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _connection = _interopRequireDefault(require("./connection.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function updateSettingJobExecution(setttings) {
  const pool = await _connection.default.openConnection();
  try {
    const query = `UPDATE CONFIG_EXECUCAO_JOBS SET STATUS_EXECUCAO = ${setttings.status}, INTERVALO_EXECUCAO = ${setttings.interval} OUTPUT INSERTED.STATUS_EXECUCAO AS status, INSERTED.INTERVALO_EXECUCAO AS interval`;
    const result = await pool.request().query(query);
    return result.recordsets[0];
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error}`);
  } finally {
    await _connection.default.closeConnection(pool);
    console.log("Conexão fechada");
  }
}
async function selectSettingJobExecution() {
  const pool = await _connection.default.openConnection();
  try {
    const query = `SELECT STATUS_EXECUCAO as status, INTERVALO_EXECUCAO as interval FROM CONFIG_EXECUCAO_JOBS`;
    const result = await pool.request().query(query);
    return result.recordsets[0];
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error}`);
  } finally {
    await _connection.default.closeConnection(pool);
    console.log("Conexão fechada");
  }
}
var _default = exports.default = {
  updateSettingJobExecution,
  selectSettingJobExecution
};