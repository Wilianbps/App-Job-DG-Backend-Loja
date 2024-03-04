import configConnectionDBModels from "../models/configConnectionDBModels.js";

async function VerifyConnectionDB(req, res) {
  const config = req.body;
  try {
    await configConnectionDBModels.connectionDB(config);
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
    console.log(error);
  }
}

export default { VerifyConnectionDB };
