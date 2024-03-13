import settingJobExecutionModel from "../models/settingJobExecutionModel.js";

async function updateSettingJobExecution(req, res) {
  try {
    const settings = req.body;

    if (!settings) return res.status(400).send();

    const result = await settingJobExecutionModel.updateSettingJobExecution(settings);

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

export default { updateSettingJobExecution, getSettingJobExecution };
