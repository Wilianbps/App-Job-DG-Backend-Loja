import settingJobExecutionModel from "../models/settingJobExecutionModel.js";

async function addSettingJobExecution(req, res) {
  try {
    const { setting } = req.query;

    if (!setting) return res.status(400).send();

    const result = await settingJobExecutionModel.insertSettingJobExecution(
      setting
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send();
  }
}

async function getSettingJobExecution(req, res) {
  try {
    const result = await settingJobExecutionModel.selectSettingJobExecution();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send();
  }
}

export default { addSettingJobExecution, getSettingJobExecution };
