!/usr/bin/env bash
set -e

FRONTEND_NAMESPACE="frontend"
BACKEND_NAMESPACE="backend"

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

kubectl apply -f k8s/backend/backend-deployment-green.yaml -n ${BACKEND_NAMESPACE}
kubectl apply -f k8s/frontend/frontend-deployment-green.yaml -n ${FRONTEND_NAMESPACE}

echo "Esperando backend GREEN..."
kubectl rollout status deployment/${BACKEND_GREEN_DEPLOYMENT} -n ${BACKEND_NAMESPACE} --timeout=120s

echo "Creando servicio temporal para backend GREEN..."
kubectl expose deployment/${BACKEND_GREEN_DEPLOYMENT} --name=backend-green-service --type=ClusterIP -n ${BACKEND_NAMESPACE} || true

echo "Esperando frontend GREEN..."
kubectl rollout status deployment/${FRONTEND_GREEN_DEPLOYMENT} -n ${FRONTEND_NAMESPACE} --timeout=120s

echo "Creando servicio temporal para frontend GREEN..."
kubectl expose deployment/${FRONTEND_GREEN_DEPLOYMENT} --name=frontend-green-service --type=NodePort -n ${FRONTEND_NAMESPACE} || true

sleep 10

if run_tests; then
  echo "TESTS OK con GREEN. Cambiando tráfico a green..."
  # Parchear los services para que apunten a green
  kubectl patch service/${FRONTEND_SERVICE} -n ${FRONTEND_NAMESPACE} \
    -p '{"spec":{"selector":{"app":"frontend-green"}}}'
  kubectl patch service/${BACKEND_SERVICE} -n ${BACKEND_NAMESPACE} \
    -p '{"spec":{"selector":{"app":"backend-green"}}}'

  echo "Eliminando infraestructura BLUE..."
  kubectl delete -f k8s/backend/backend-deployment.yaml -n ${BACKEND_NAMESPACE} || true
  kubectl delete -f k8s/frontend/frontend-deployment.yaml -n ${FRONTEND_NAMESPACE} || true

  echo "Eliminando servicios temporales green..."
  kubectl delete svc backend-green-service -n ${BACKEND_NAMESPACE} || true
  kubectl delete svc frontend-green-service -n ${FRONTEND_NAMESPACE} || true

  echo "Despliegue Blue-Green completado con éxito"
else
  echo "ERROR EN LOS TESTS."
  kubectl delete deployment/${FRONTEND_GREEN_DEPLOYMENT} -n ${FRONTEND_NAMESPACE} || true
  kubectl delete deployment/${BACKEND_GREEN_DEPLOYMENT} -n ${BACKEND_NAMESPACE} || true
  kubectl delete svc backend-green-service -n ${BACKEND_NAMESPACE} || true
  kubectl delete svc frontend-green-service -n ${FRONTEND_NAMESPACE} || true
  echo "Manteniendo blue en producción"
  exit 1
fi
