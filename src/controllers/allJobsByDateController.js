import allJobsByDateModels from "../models/allJobsByDateModels.js";

async function getAllJobs(req, res) {
  const { startTime } = req.query;

  console.log(startTime)
  try {
    const allJobsByDate = await allJobsByDateModels.getJobsByDate(startTime);
     const transformPropsAllJobs = await allJobsByDate.recordsets[0].map((job) => ({
      id: job.ID,
      name: job.NOME,
      startTime: job.DATA_HORA,
      table: job.TABELA,
      action: job.ACAO,
      status: job.STATUS_JOB,
    }));

    return res.status(200).json(transformPropsAllJobs);
  } catch (error) {
    console.log(error, "erro na solicitação");
    return res.status(400).end();
  }
}

export default { getAllJobs };
