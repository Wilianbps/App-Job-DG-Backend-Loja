import testConnectionModels from "../models/testConnectionModels.js";

async function testConnection(_req, res) {
  setTimeout(async () => {
    try {
      await testConnectionModels.testConnectionDatabase();

      res.status(200).json({ message: "Conexão com o banco local feita com sucesso!" });
    } catch (error) {
      res.status(400).json({ message:  "Erro ao configurar conexão com banco local. Verifique as informações de conexão fornecidas!" });
    }
  }, [3000]);
}

export default { testConnection };
