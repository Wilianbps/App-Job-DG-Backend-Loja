"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _config = _interopRequireDefault(require("./config.js"));
var _jobslocalDBController = _interopRequireDefault(require("./controllers/jobslocalDBController.js"));
var _allJobsByDateController = _interopRequireDefault(require("./controllers/allJobsByDateController.js"));
var _localDBController = _interopRequireDefault(require("./controllers/localDBController.js"));
var _configConnectionDBController = _interopRequireDefault(require("./controllers/configConnectionDBController.js"));
var _testConnectionController = _interopRequireDefault(require("./controllers/testConnectionController.js"));
var _settingJobExecutionController = _interopRequireDefault(require("./controllers/settingJobExecutionController.js"));
var _getActiveTablesController = _interopRequireDefault(require("./controllers/getActiveTablesController.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.get("/form-data-config", (req, res) => {
  const objectConfig = {
    user: _config.default.user,
    password: _config.default.password,
    server: _config.default.server,
    database: _config.default.database
  };
  res.status(200).json(objectConfig);
});
router.get("/test-connection-database", _testConnectionController.default.testConnection);
router.post("/configuracao-conexao-db", _configConnectionDBController.default.VerifyConnectionDB);
router.get("/jobs", _allJobsByDateController.default.getAllJobs);
router.post("/jobs/path-remoteToStoreDB", _jobslocalDBController.default.startJob);
router.put("/jobs/path-remoteToStoreDB/:id", _jobslocalDBController.default.updateJob);
router.post("/register-path-remoteToStoreDB", _localDBController.default.insertRegisterInLocalDB);
router.put("/setting-job-execution", _settingJobExecutionController.default.updateSettingJobExecution);
router.get("/setting-job-execution", _settingJobExecutionController.default.getSettingJobExecution);
router.get("/search-on-stage", _jobslocalDBController.default.searchOnStage);
router.put("/update-Status-On-Stage", _jobslocalDBController.default.updateStatusOnStage);
router.get("/active-store-tables", _getActiveTablesController.default.getActiveTablesStore);
var _default = exports.default = router;