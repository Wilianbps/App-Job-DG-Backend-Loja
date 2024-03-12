import jobsUsersModels from "../models/jobsUsersModels.js";

async function getAllUsers(req, res) {
  const users = await jobsUsersModels.getAll();
  return res.status(200).json(users.recordsets);
}

async function startJob(req, res) {
  try {
    const newJob = req.body;

    if (!newJob) return res.status(400).end();

    const result = await jobsUsersModels.startJobTableUsers(newJob);

    let transformPropsAllJobs = await result.recordsets[0].map((job) => ({
      id: job.ID,
      name: job.NOME,
      startTime: job.DATA_HORA,
      table: job.TABELA,
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
      console.log("id", id);
      const { status } = req.query;
      if (id && status) {
        const result = await jobsUsersModels.updateJob(id, status);

        let transformPropsAllJobs = await result.recordsets[0].map((job) => ({
          id: job.ID,
          name: job.NOME,
          startTime: job.DATA_HORA,
          table: job.TABELA,
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
