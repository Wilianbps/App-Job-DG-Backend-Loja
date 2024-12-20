import sql from "mssql";
import fs from "fs";
import util from "util";

async function connectionDB(config) {
  try {
    const objectConnection = {
      user: config.user,
      password: config.password,
      server: config.server,
      database: config.database,
      port: 1433,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    };

    //util.inpect = mantem a versao original do objeto, sem as aspas duplas na propriedade
    const jsonString = util.inspect(objectConnection, { depth: null });

    fs.writeFileSync(
      "src/config.js",
      `const config = ${jsonString};\n\nexport default config;`
    );
  } catch (error) {
    throw error;
  } finally {
    try {
      await sql.close();
      console.log("Conexão fechada");
    } catch (closeErr) {
      console.error("Erro ao fechar a conexão com o banco de dados:", closeErr);
    }
  }
}

export default { connectionDB };
