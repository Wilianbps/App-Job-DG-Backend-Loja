"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _userModels = _interopRequireDefault(require("../models/userModels.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function insertUsers(req, res) {
  try {
    const dataUsers = req.body;
    if (Object.keys(dataUsers).length === 0) return res.status(200).json({
      message: "Não havia dados "
    });
    const resultSelect = await _userModels.default.getUsers();
    if (resultSelect.recordset) {
      const idSet = new Set(dataUsers.map(item => item.ID_USUARIO_DGCS));
      const commonUsers = resultSelect.recordset.filter(item => idSet.has(item.ID_USUARIO_DGCS));
      if (commonUsers.length === 0) {
        for (let i = 0; i < dataUsers.length; i++) {
          await _userModels.default.insertUserInTable(dataUsers[i]);
        }
        res.status(200).json({
          message: "Usuários inseridos com sucesso"
        });
      } else {
        res.status(400).json({
          message: "Existe objeto duplicado"
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
var _default = exports.default = {
  insertUsers
};