import allJobsByDateModels from "../models/allJobsByDateModels.js";

async function getAllJobs(req, res) {
  const { startTime } = req.query;

  try {
    const allJobsByDate = await allJobsByDateModels.getJobsByDate(startTime);
    const transformPropsAllJobs = await allJobsByDate.recordsets[0].map(
      (job) => ({
        id: job.ID,
        name: job.NOME,
        startTime: job.DATA_HORA,
        table: job.TABELA,
        action: job.ACAO,
        path: job.CAMINHO,
        status: job.STATUS_JOB,
      })
    );

    const reverseDateJobs  = transformPropsAllJobs.reverse();

    return res.status(200).json(reverseDateJobs);
  } catch (error) {
    console.log(error, "erro na solicitação");
    return res.status(400).end();
  }
}

export default { getAllJobs };
