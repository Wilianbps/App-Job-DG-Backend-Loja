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

    let transformPropsAllJobs = await result.recordsets[0].map((job) => ({
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


      if (id && statusJob && amountRecords) {
        const result = await jobsLocalDBModels.updateJob(
          id,
          amountRecords,
          statusJob
        );

        let transformPropsAllJobs = await result.recordsets[0].map((job) => ({
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
      }
    } catch (error) {
      res.status(400).end();
      console.log(error, "erro na solicitação");
    }
  }, [10000]);
}

export default { getAllUsers, startJob, updateJob };
