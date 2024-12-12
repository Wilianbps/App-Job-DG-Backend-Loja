import jobsLocalDBModels from "../models/jobsLocalDBModels.js";

async function getAllUsers(req, res) {
  const users = await jobsLocalDBModels.getAll();
  return res.status(200).json(users.recordsets);
}

async function startJob(req, res) {
  try {
    const newJob = req.body;

    if (!newJob) return res.status(400).end();

    const result = await jobsLocalDBModels.startJobTableUsers(newJob);


      let transformPropsAllJobs = await result.recordsets[0]?.map((job) => ({
        id: job.ID,
        name: job.NOME,
        startTime: job.DATA_HORA,
        table: job.TABELA,
        path: job.CAMINHO,
        action: job.ACAO,
        status: job.STATUS_JOB,
      }));

      transformPropsAllJobs[0].id = transformPropsAllJobs[0].id.toString();

      res.status(200).json(transformPropsAllJobs[0]);
    
  } catch (error) {
    res.status(400).end();
    console.log(error, "erro na solicitação");
  }
}

async function updateJob(req, res) {
  setTimeout(async () => {
    try {
      const { id } = req.params;
      const { amountRecords, statusJob } = req.body;

      console.log(id);
      console.log(amountRecords);
      console.log(statusJob);

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
      console.log(error, "erro na solicitação");
    }
  }, [10000]);
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

    console.log("resultt dentro do controller mas dataStage", dataStage)

    const data = [];

    if (dataStage.length > 0) {
      for (let i = 0; i < dataStage.length; i++) {
        const id = dataStage[i].ID;
        const result = await jobsLocalDBModels.searchUsersInTableUsers(
          id,
          table
        );
        result.recordset[0].whereId = id;
        data.push(result.recordset[0]);
      }

      const mergedArray = data.map((item, index) => {
        return {
          ...item,
          stageId: dataStage[index].STAGE_ID,
          type: dataStage[index].TIPO,
          table,
        };
      });

      console.log("array que vai para o front", mergedArray);

      return res.status(200).json(mergedArray);
    } else {
      return res.status(200).json({ message: "Não havia dados" });
    }
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
};
