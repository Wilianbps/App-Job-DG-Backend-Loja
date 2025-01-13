"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _testConnectionModels = _interopRequireDefault(require("../models/testConnectionModels.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function testConnection(_req, res) {
  setTimeout(async () => {
    try {
      await _testConnectionModels.default.testConnectionDatabase();
      res.status(200).json({
        message: "Conexão com o banco local feita com sucesso!"
      });
    } catch (error) {
      res.status(400).json({
        message: "Erro ao configurar conexão com banco local. Verifique as informações de conexão fornecidas!"
      });
    }
  }, [1000]);
}
var _default = exports.default = {
  testConnection
};