"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jobsLocalDBModels = _interopRequireDefault(require("../models/jobsLocalDBModels.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function getAllUsers(req, res) {
  const users = await _jobsLocalDBModels.default.getAll();
  return res.status(200).json(users.recordsets);
}
async function startJob(req, res) {
  try {
    const newJob = req.body;
    if (!newJob) {
      return res.status(400).end(); // Validação caso o corpo da requisição esteja vazio
    }

    // Chama o model para inserir o novo job na tabela
    const result = await _jobsLocalDBModels.default.startJobTableUsers(newJob);

    // Verifica se o resultado da consulta foi bem-sucedido
    if (!result || !result.recordsets || result.recordsets.length === 0) {
      return res.status(500).send("Erro ao inserir o job na tabela.");
    }
    let transformPropsAllJobs = await result.recordsets[0]?.map(job => ({
      id: job.ID,
      name: job.NOME,
      startTime: job.DATA_HORA,
      table: job.TABELA,
      path: job.CAMINHO,
      action: job.ACAO,
      status: job.STATUS_JOB
    }));

    // Modifica o id para string, se necessário
    if (transformPropsAllJobs && transformPropsAllJobs[0]) {
      transformPropsAllJobs[0].id = transformPropsAllJobs[0].id.toString();
    }
    res.status(200).json(transformPropsAllJobs[0]); // Retorna o primeiro job inserido
  } catch (error) {
    res.status(400).end();
    console.error(error, "erro na solicitação teste start job");
  }
}
async function updateJob(req, res) {
  try {
    const {
      id
    } = req.params;
    const {
      amountRecords,
      statusJob
    } = req.body;
    if (!id || !statusJob) return res.status(400).send();

    // Atraso de 10 segundos
    await new Promise(resolve => setTimeout(resolve, 10000));
    const result = await _jobsLocalDBModels.default.updateJob(id, amountRecords, statusJob);

    // Verifique se result não é vazio ou indefinido antes de continuar
    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Job não encontrado ou não foi atualizado."
      });
    }

    // Mapeamento dos resultados
    let transformPropsAllJobs = result.map(job => ({
      id: job.ID,
      name: job.NOME,
      startTime: job.DATA_HORA,
      table: job.TABELA,
      path: job.CAMINHO,
      action: job.ACAO,
      status: job.STATUS_JOB
    }));
    transformPropsAllJobs[0].id = transformPropsAllJobs[0].id.toString();
    return res.status(200).send(transformPropsAllJobs[0]);
  } catch (error) {
    console.log(error, "erro na solicitação teste updateJob");
    return res.status(400).send({
      message: "Erro ao processar a solicitação."
    });
  }
}

/* async function updateJob(req, res) {
  setTimeout(async () => {
    try {
      const { id } = req.params;
      const { amountRecords, statusJob } = req.body;

      if (!id || !statusJob) return res.status(400).send();

      const result = await jobsLocalDBModels.updateJob(
        id,
        amountRecords,
        statusJob
      );

      let transformPropsAllJobs = await result.map((job) => ({
        id: job.ID,
        name: job.NOME,
        startTime: job.DATA_HORA,
        table: job.TABELA,
        path: job.CAMINHO,
        action: job.ACAO,
        status: job.STATUS_JOB,
      }));

      transformPropsAllJobs[0].id = transformPropsAllJobs[0].id.toString();

      return res.status(200).send(transformPropsAllJobs[0]);
    } catch (error) {
      res.status(400).end();
      console.log(error, "erro na solicitação teste updateJob");
    }
  }, [10000]);
} */

async function searchOnStage(req, res) {
  try {
    const {
      table,
      storeCode
    } = req.query;
    if (!table || !storeCode) return res.status(400).end();
    const usersOnStage = await _jobsLocalDBModels.default.searchUsersOnStage(table, storeCode);
    const dataStage = usersOnStage.recordsets[0];
    if (!dataStage || dataStage.length === 0) {
      return res.status(200).json({
        message: "Não havia dados"
      });
    }
    const data = [];
    for (const stageRow of dataStage) {
      const idCondition = stageRow.ID; // A cláusula completa do ID (e.g., "ID_AUX_ENTRADA = '10685'")
      console.log(`Buscando dados com ID Condition: ${idCondition}`);

      // Busca os dados na tabela correspondente
      const result = await _jobsLocalDBModels.default.searchUsersInTableUsers(idCondition, table);
      if (result.recordset.length > 0) {
        const user = result.recordset[0];
        user.whereId = idCondition; // Adiciona a condição usada como referência
        data.push(user);
      } else {
        console.log(`Nenhum dado encontrado para ID Condition: ${idCondition}`);
      }
    }
    const mergedArray = data.map((item, index) => {
      return {
        ...item,
        stageId: dataStage[index].STAGE_ID,
        type: dataStage[index].TIPO,
        table
      };
    });
    return res.status(200).json(mergedArray);
  } catch (error) {
    console.log("error", error);
    return res.status(400).send();
  }
}
async function updateStatusOnStage(req, res) {
  try {
    const data = req.body;
    if (!data) return res.status(400).send();
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const id = data[i].stageId;
        await _jobsLocalDBModels.default.updateStageStatus(id);
      }
      return res.status(200).end();
    } else {
      return res.status(400).end();
    }
  } catch (error) {
    res.status(400).end();
  }
}
var _default = exports.default = {
  getAllUsers,
  startJob,
  updateJob,
  searchOnStage,
  updateStatusOnStage
};