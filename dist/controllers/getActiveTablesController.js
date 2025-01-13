"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _getActiveTablesModels = _interopRequireDefault(require("../models/getActiveTablesModels.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function getActiveTablesStore(req, res) {
  try {
    const queryTables = req.query;
    const result = await _getActiveTablesModels.default.selectActiveTablesStore(queryTables);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).end();
  }
}
var _default = exports.default = {
  getActiveTablesStore
};