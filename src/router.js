import express from "express";
import config from "./configs/config.js";
import jobslocalDBController from "./controllers/jobslocalDBController.js";

import allJobsByDateController from "./controllers/allJobsByDateController.js";
import localDBController from "./controllers/localDBController.js";
import configConnectionDBController from "./controllers/configConnectionDBController.js";
import testConnectionController from "./controllers/testConnectionController.js";
import settingJobExecutionController from "./controllers/settingJobExecutionController.js";
import getActiveTablesController from "./controllers/getActiveTablesController.js";

const router = express.Router();

router.get("/form-data-config", (req, res) => {
  const objectConfig = {
    user: config.user,
    password: config.password,
    server: config.server,
    database: config.database,
  };

  res.status(200).json(objectConfig);
});

router.get(
  "/test-connection-database",
  testConnectionController.testConnection
);

router.post(
  "/configuracao-conexao-db",
  configConnectionDBController.VerifyConnectionDB
);

router.get("/jobs", allJobsByDateController.getAllJobs);

router.post("/jobs/path-remoteToStoreDB", jobslocalDBController.startJob);

router.put("/jobs/path-remoteToStoreDB/:id", jobslocalDBController.updateJob);

router.post(
  "/register-path-remoteToStoreDB",
  localDBController.insertRegisterInLocalDB
);

router.put(
  "/setting-job-execution",
  settingJobExecutionController.updateSettingJobExecution
);

router.get(
  "/setting-job-execution",
  settingJobExecutionController.getSettingJobExecution
);

router.get("/search-on-stage", jobslocalDBController.searchOnStage);

router.put(
  "/update-Status-On-Stage",
  jobslocalDBController.updateStatusOnStage
);

router.get(
  "/active-store-tables",
  getActiveTablesController.getActiveTablesStore
);

export default router;
