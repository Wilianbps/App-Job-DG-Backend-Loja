import jobsLocalDBModels from "../models/jobsLocalDBModels.js";
import pLimit from 'promise-limit'

const limit = pLimit(1);

async function getAllUsers(req, res) {
  const users = await jobsLocalDBModels.getAll();
  return res.status(200).json(users.recordsets);
}

async function startJob(req, res) {
  try {
    const newJob = req.body;

    if (!newJob) {
      return res.status(400).end(); // Validação caso o corpo da requisição esteja vazio
    }

    // Executa o job dentro do limitador
    const jobResult = await limit(async () => {
      // Chama o model para inserir o novo job na tabela
      const result = await jobsLocalDBModels.startJobTableUsers(newJob);

      // Verifica se o resultado da consulta foi bem-sucedido
      if (!result || !result.recordsets || result.recordsets.length === 0) {
        throw new Error("Erro ao inserir o job na tabela.");
      }

      const transformPropsAllJobs = result.recordsets[0]?.map((job) => ({
        id: job.ID,
        name: job.NOME,
        startTime: job.DATA_HORA,
        table: job.TABELA,
        path: job.CAMINHO,
        action: job.ACAO,
        status: job.STATUS_JOB,
      }));

      // Modifica o id para string, se necessário
      if (transformPropsAllJobs && transformPropsAllJobs[0]) {
        transformPropsAllJobs[0].id = transformPropsAllJobs[0].id.toString();
      }

      return transformPropsAllJobs[0]; // Retorna o primeiro job inserido
    });

    // Envia o resultado do job processado
    res.status(200).json(jobResult);
  } catch (error) {
    console.error(error, "erro na solicitação teste start job");
    res.status(400).send({ message: error.message });
  }
}

async function updateJob(req, res) {
  try {
    const { id } = req.params;
    const { amountRecords, statusJob } = req.body;

    if (!id || !statusJob) return res.status(400).send();

    // Executa o update dentro do limitador
    const jobResult = await limit(async () => {
      // Simula atraso de 10 segundos (se necessário)
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const result = await jobsLocalDBModels.updateJob(id, amountRecords, statusJob);

      // Verifique se result não é vazio ou indefinido antes de continuar
      if (!result || result.length === 0) {
        throw new Error("Job não encontrado ou não foi atualizado.");
      }

      // Mapeamento dos resultados
      const transformPropsAllJobs = result.map((job) => ({
        id: job.ID,
        name: job.NOME,
        startTime: job.DATA_HORA,
        table: job.TABELA,
        path: job.CAMINHO,
        action: job.ACAO,
        status: job.STATUS_JOB,
      }));

      transformPropsAllJobs[0].id = transformPropsAllJobs[0].id.toString();

      return transformPropsAllJobs[0];
    });

    // Retorna o resultado do update processado
    return res.status(200).send(jobResult);
  } catch (error) {
    console.error(error, "Erro na execução do updateJob");
    return res.status(400).send({ message: error.message });
  }
}

async function checkJobsInExecutionAndUpdate(req, res) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 120000));
    await jobsLocalDBModels.getJobsInExecutionAndUpdate();
    return res.status(200).json({ message: 'Jobs atualizados com sucesso!' });
  } catch (error) {
    console.error('Erro no check jobs:', error); // Adiciona um log para ver o erro exato
    return res.status(400).send({ message: "Erro ao verificar os jobs", error: error.message });
  }
}

async function searchOnStage(req, res) {
  try {
    const { table, storeCode } = req.query;

    if (!table || !storeCode) return res.status(400).end();

    const usersOnStage = await jobsLocalDBModels.searchUsersOnStage(
      table,
      storeCode
    );

    const dataStage = usersOnStage.recordsets[0];

    if (!dataStage || dataStage.length === 0) {
      return res.status(200).json({ message: "Não havia dados" });
    }

    const data = [];

    for (const stageRow of dataStage) {
      const idCondition = stageRow.ID; // A cláusula completa do ID (e.g., "ID_AUX_ENTRADA = '10685'")
      console.log(`Buscando dados com ID Condition: ${idCondition}`);

      // Busca os dados na tabela correspondente
      const result = await jobsLocalDBModels.searchUsersInTableUsers(idCondition, table);
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
        table,
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
        await jobsLocalDBModels.updateStageStatus(id);
      }
      return res.status(200).end();
    } else {
      return res.status(400).end();
    }
  } catch (error) {
    res.status(400).end();
  }
}

export default {
  getAllUsers,
  startJob,
  updateJob,
  searchOnStage,
  updateStatusOnStage,
  checkJobsInExecutionAndUpdate
};
