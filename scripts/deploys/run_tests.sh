#!/usr/bin/env bash
set -e

SERVICE="backend-service"
NAMESPACE="backend"

# Parseamos argumentos
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --service) SERVICE="$2"; shift;;
    *) echo "Argumento desconocido: $1"; exit 1;;
  esac
  shift
done

echo "Ejecutando tests contra el servicio: ${SERVICE}"

# Port-forwarding al servicio
kubectl port-forward svc/${SERVICE} 8000:8000 -n ${NAMESPACE} &
PORT_FORWARD_PID=$!

# Espera para que el servicio esté listo
sleep 5

# Llamada al endpoint health de la API
RESPONSE=$(curl -s http://localhost:8000/api/health)

# Extracción del valor de "status" del JSON
STATUS=$(echo "$RESPONSE" | jq -r '.status')

# Detener el port-forwarding
kill $PORT_FORWARD_PID || true

# Comprobación de que el valor de "status" sea "OK"
if [[ "$STATUS" == "OK" ]]; then
  echo "El endpoint /health de la API devolvió el valor de \"status\" como \"OK\". Test superado."
  exit 0
else
  echo "El endpoint /health de la API no devolvió el valor de \"status\" como \"OK\". Test fallido."
  echo "Respuesta del endpoint: $RESPONSE"
  exit 1
fi
