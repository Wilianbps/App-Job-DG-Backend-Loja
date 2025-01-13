"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mssql = _interopRequireDefault(require("mssql"));
var _fs = _interopRequireDefault(require("fs"));
var _util = _interopRequireDefault(require("util"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function connectionDB(config) {
  try {
    const objectConnection = {
      user: config.user,
      password: config.password,
      server: config.server,
      database: config.database,
      port: 1433,
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    };

    //util.inpect = mantem a versao original do objeto, sem as aspas duplas na propriedade
    const jsonString = _util.default.inspect(objectConnection, {
      depth: null
    });
    _fs.default.writeFileSync("src/config.js", `const config = ${jsonString};\n\nexport default config;`);
  } catch (error) {
    throw error;
  } finally {
    try {
      await _mssql.default.close();
      console.log("Conexão fechada");
    } catch (closeErr) {
      console.error("Erro ao fechar a conexão com o banco de dados:", closeErr);
    }
  }
}
var _default = exports.default = {
  connectionDB
};