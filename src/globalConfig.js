// globalConfig.js
let intervalInMillis = null;

export function getInterval() {
  return intervalInMillis;
}

export function setIntervalInMillis(value) {
  intervalInMillis = value;
  console.log("Intervalo atualizado para:", intervalInMillis);
}
