"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _connection = _interopRequireDefault(require("./connection.js"));
var _config = _interopRequireDefault(require("../config.js"));
var _mssql = _interopRequireDefault(require("mssql"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function testConnectionDatabase() {
  try {
    await _mssql.default.connect(_config.default);
  } catch (error) {
    throw error;
  } finally {
    await _mssql.default.close();
    console.log("Conexão fechada");
  }
}
var _default = exports.default = {
  testConnectionDatabase
};