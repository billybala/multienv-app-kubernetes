!/usr/bin/env bash
set -e

NAMESPACE="default"

# Despliegues e imágenes green
FRONTEND_GREEN_DEPLOYMENT="frontend-deployment-green"
BACKEND_GREEN_DEPLOYMENT="backend-deployment-green"
FRONTEND_GREEN_IMAGE="ghcr.io/billybala/multienv-app-kubernetes/frontend:latest"
BACKEND_GREEN_IMAGE="ghcr.io/billybala/multienv-app-kubernetes/backend:latest"

# Despliegues blue (actuales)
FRONTEND_BLUE_DEPLOYMENT="frontend-deployment"
BACKEND_BLUE_DEPLOYMENT="backend-deployment"

# Services existentes que apuntan actualmente a blue
FRONTEND_SERVICE="frontend-service"
BACKEND_SERVICE="backend-service"

# Función de tests
function run_tests() {
  ./run_tests.sh --service backend-green-service
}

echo "Iniciando despliegue Blue-Green..."

echo "Desplegando infraestructura GREEN..."

kubectl apply -f k8s/backend/backend-deployment-green.yaml -n ${NAMESPACE}
kubectl apply -f k8s/frontend/frontend-deployment-green.yaml -n ${NAMESPACE}

echo "Esperando backend GREEN..."
kubectl rollout status deployment/${BACKEND_GREEN_DEPLOYMENT} -n ${NAMESPACE} --timeout=120s

echo "Esperando frontend GREEN..."
kubectl rollout status deployment/${FRONTEND_GREEN_DEPLOYMENT} -n ${NAMESPACE} --timeout=120s

echo "Creando servicio temporal para frontend GREEN..."
kubectl expose deployment/${FRONTEND_GREEN_DEPLOYMENT} --name=frontend-green-service --type=NodePort -n ${NAMESPACE} || true

# Espera para simular que el service está listo
sleep 10

if run_tests; then
  echo "TESTS OK con GREEN. Cambiando tráfico a green..."
  # Parchear los services para que apunten a green
  kubectl patch service/${FRONTEND_SERVICE} -n ${NAMESPACE} \
    -p '{"spec":{"selector":{"app":"frontend-green"}}}'
  kubectl patch service/${BACKEND_SERVICE} -n ${NAMESPACE} \
    -p '{"spec":{"selector":{"app":"backend-green"}}}'

  echo "Eliminando infraestructura BLUE..."
  kubectl delete -f k8s/backend/backend-deployment.yaml -n ${NAMESPACE} || true
  kubectl delete -f k8s/frontend/frontend-deployment.yaml -n ${NAMESPACE} || true

  echo "Eliminando servicio temporal green..."
  kubectl delete svc frontend-green-service -n ${NAMESPACE} || true

  echo "Despliegue Blue-Green completado con éxito"
else
  echo "ERROR EN LOS TESTS."
  kubectl delete deployment/${FRONTEND_GREEN_DEPLOYMENT} -n ${NAMESPACE} || true
  kubectl delete deployment/${BACKEND_GREEN_DEPLOYMENT} -n ${NAMESPACE} || true
  kubectl delete svc frontend-green-service -n ${NAMESPACE} || true
  echo "Manteniendo blue en producción"
  exit 1
fi
