import dataLocalDBModels from "../models/dataLocalDBModels.js";

async function insertRegisterInLocalDB(req, res) {
  try {
    const dataUsers = req.body;
    
    console.log(dataUsers)

    if (Object.keys(dataUsers).length === 0)
      return res.status(200).json({ message: "Não havia dados " });

    dataUsers.forEach(async (item, index) => {
      if (item.type == "I") {
        await dataLocalDBModels.insertDataInTable(dataUsers[index]);
        return res.status(200).send();
      } else if (item.type == "U") {
        await dataLocalDBModels.updateDataInTable(dataUsers[index]);
        return res.status(200).send();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

export default { insertRegisterInLocalDB };
