"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _allJobsByDateModels = _interopRequireDefault(require("../models/allJobsByDateModels.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function getAllJobs(req, res) {
  const {
    startTime
  } = req.query;
  try {
    const allJobsByDate = await _allJobsByDateModels.default.getJobsByDate(startTime);
    return res.status(200).json(allJobsByDate);
  } catch (error) {
    console.log(error, "erro na solicitação");
    return res.status(400).end();
  }
}
var _default = exports.default = {
  getAllJobs
};