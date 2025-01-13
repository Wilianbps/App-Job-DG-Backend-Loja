"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dataLocalDBModels = _interopRequireDefault(require("../models/dataLocalDBModels.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function insertRegisterInLocalDB(req, res) {
  try {
    const dataUsers = req.body;
    if (Object.keys(dataUsers).length === 0) return res.status(200).json({
      message: "Não havia dados "
    });
    dataUsers.forEach(async (item, index) => {
      if (item.type == "I") {
        await _dataLocalDBModels.default.insertDataInTable(dataUsers[index]);
        return res.status(200).send();
      } else if (item.type == "U") {
        await _dataLocalDBModels.default.updateDataInTable(dataUsers[index]);
        return res.status(200).send();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
var _default = exports.default = {
  insertRegisterInLocalDB
};