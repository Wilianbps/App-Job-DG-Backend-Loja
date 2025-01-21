import app from "./app.js";
import { WebSocketServer } from 'ws';
import { getInterval } from './globalConfig.js';
import settingJobExecutionModel from './models/settingJobExecutionModel.js';
import { setIntervalInMillis, setStatus, getStatus } from './globalConfig.js'

const server = app.listen(process.env.PORT || 3004, () => {
  console.log("Server running on port 3004");
});

console.log("Status atual:", getStatus());

const wss = new WebSocketServer({ server });

// Inicializa o intervalo global no início
(async function initializeInterval() {
  try {
    const result = await settingJobExecutionModel.selectSettingJobExecution();
    if (result && result.length > 0) {
      const intervalInMillis = result[0].interval * 60000; // Inicializa com o valor do banco
      setIntervalInMillis(intervalInMillis); // Atualiza no módulo global
    } else {
      console.error("Configuração inicial não encontrada no banco de dados.");
    }
  } catch (error) {
    console.error("Erro ao carregar a configuração inicial:", error);
  }
})();

(async function initializeStatus() {
  try {
    const result = await settingJobExecutionModel.selectSettingJobExecution();
    if (result && result.length > 0) {
      const initialStatus = result[0].status;
      setStatus(initialStatus); // Atualiza o status global
    } else {
      console.error("Configuração do status não encontrada no banco de dados.");
    }
  } catch (error) {
    console.error("Erro ao carregar a configuração inicial do status:", error);
  }
})();

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.send('Conexão estabelecida. Aguardando Jobs.');

  // Usa o valor global para o setInterval
  const jobInterval = setInterval(() => {
    const intervalInMillis = getInterval();
    const currentStatus = getStatus() == 0 ? false : true;
    console.log("Status atual:", currentStatus);
    if (intervalInMillis && currentStatus == true) {
      ws.send('ExecutarJobs');
      console.log("Executar Jobs");
    }
  }, getInterval() || 300000); // Usa o valor global ou um padrão de 5 minutos

  ws.on('close', () => {
    clearInterval(jobInterval);
    console.log('Cliente desconectado');
  });
});
