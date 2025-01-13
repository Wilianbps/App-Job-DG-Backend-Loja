"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _configConnectionDBModels = _interopRequireDefault(require("../models/configConnectionDBModels.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function VerifyConnectionDB(req, res) {
  const config = req.body;
  try {
    await _configConnectionDBModels.default.connectionDB(config);
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
    console.log(error);
  }
}
var _default = exports.default = {
  VerifyConnectionDB
};