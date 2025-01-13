"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _settingJobExecutionModel = _interopRequireDefault(require("../models/settingJobExecutionModel.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function updateSettingJobExecution(req, res) {
  try {
    const settings = req.body;
    if (!settings) return res.status(400).send();
    const result = await _settingJobExecutionModel.default.updateSettingJobExecution(settings);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send();
  }
}
async function getSettingJobExecution(req, res) {
  try {
    const result = await _settingJobExecutionModel.default.selectSettingJobExecution();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send();
  }
}
var _default = exports.default = {
  updateSettingJobExecution,
  getSettingJobExecution
};