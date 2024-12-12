import allJobsByDateModels from "../models/allJobsByDateModels.js";

async function getAllJobs(req, res) {
  const { startTime } = req.query;

  try {
    const allJobsByDate = await allJobsByDateModels.getJobsByDate(startTime);

    return res.status(200).json(allJobsByDate);
  } catch (error) {
    console.log(error, "erro na solicitação");
    return res.status(400).end();
  }
}

export default { getAllJobs };
