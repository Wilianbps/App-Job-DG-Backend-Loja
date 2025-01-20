import settingJobExecutionModel from "../models/settingJobExecutionModel.js";
import { setIntervalInMillis } from './../globalConfig.js'

async function updateSettingJobExecution(req, res) {
  try {
    const settings = req.body;

    if (!settings) return res.status(400).send();

    const result = await settingJobExecutionModel.updateSettingJobExecution(settings);

    if (settings.interval) {
      setIntervalInMillis(settings.interval * 60000); // Converte minutos para milissegundos
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send();
  }
}

async function getSettingJobExecution(req, res) {
  try {
    const result = await settingJobExecutionModel.selectSettingJobExecution();

    if (result && result.length > 0) {

      res.status(200).json(result);
    } else {
      console.error("Configuração não encontrada no banco de dados.");
      res.status(404).send('Configuração não encontrada');
    }
  } catch (error) {
    res.status(400).send();
  }
}

export default { updateSettingJobExecution, getSettingJobExecution };
