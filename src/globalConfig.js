// globalConfig.js
let intervalInMillis = null;
let status = false;

export function getInterval() {
  return intervalInMillis;
}

export function setIntervalInMillis(value) {
  intervalInMillis = value;
  console.log("Intervalo atualizado para:", intervalInMillis);
}

// Funções para o status
export function getStatus() {
  return status;
}

export function setStatus(value) {
  status = value
  console.log("Status atualizado para:", status);
}