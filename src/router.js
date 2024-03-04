import express from "express";
import config from "./configs/config.js";
import jobsUsersController from "./controllers/jobsUsersController.js";

import allJobsByDateController from "./controllers/allJobsByDateController.js";
import userController from "./controllers/userController.js";
import configConnectionDBController from "./controllers/configConnectionDBController.js";
import testConnectionController from "./controllers/testConnectionController.js";

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

/* router.get("/jobs/users", jobsUsersController.getAllUsers); */
router.get("/jobs", allJobsByDateController.getAllJobs);

/* router.get("/jobs/users", jobsUsersController.getJobsUsersByDate); */
router.post("/jobs/users", jobsUsersController.startJobTableUsers);

router.put("/jobs/users/:id", jobsUsersController.updateJobUser);

/* router.get("/users", userController.insertUsers); */

router.post("/users", userController.insertUsers);

export default router;
