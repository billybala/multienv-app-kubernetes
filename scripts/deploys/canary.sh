#!/usr/bin/env bash
set -e

# Variables
BACKEND_NAMESPACE="backend"
FRONTEND_NAMESPACE="frontend"
FRONTEND_DEPLOYMENT="frontend-deployment"
BACKEND_DEPLOYMENT="backend-deployment"
FRONTEND_IMAGE="ghcr.io/billybala/multienv-app-kubernetes/frontend:latest"
BACKEND_IMAGE="ghcr.io/billybala/multienv-app-kubernetes/backend:latest"

FRONTEND_OLD_IMAGE="ghcr.io/billybala/multienv-app-kubernetes/frontend:latest"
BACKEND_OLD_IMAGE="ghcr.io/billybala/multienv-app-kubernetes/backend:latest"

FRONTEND_SERVICE="frontend-service"
BACKEND_SERVICE="backend-service"

# Número de réplicas en producción
REPLICAS_PRODUCTION=3

# Funcion para ejecutar los tests
function run_tests() {
  echo "Ejecutando tests..."
  ./run_tests.sh --service backend-service
}

# Función para revertir los cambios en el backend
function revert_backend() {
  echo "Revirtiendo cambios en el backend..."
  kubectl set image deployment/${BACKEND_DEPLOYMENT} backend=${BACKEND_OLD_IMAGE} -n ${BACKEND_NAMESPACE}
  kubectl scale deployment/${BACKEND_DEPLOYMENT} --replicas=${REPLICAS_PRODUCTION} -n ${BACKEND_NAMESPACE}
  kubectl rollout status deployment/${BACKEND_DEPLOYMENT} -n ${BACKEND_NAMESPACE} --timeout=120s
}

# Función para revertir los cambios en el frontend
function revert_frontend() {
  echo "Revirtiendo cambios en el frontend..."
  kubectl set image deployment/${FRONTEND_DEPLOYMENT} frontend=${FRONTEND_OLD_IMAGE} -n ${FRONTEND_NAMESPACE}
  kubectl scale deployment/${FRONTEND_DEPLOYMENT} --replicas=${REPLICAS_PRODUCTION} -n ${FRONTEND_NAMESPACE}
  kubectl rollout status deployment/${FRONTEND_DEPLOYMENT} -n ${FRONTEND_NAMESPACE} --timeout=120s
}

echo "Iniciando canary..."

# Actualizar el backend
echo "Actualizando backend a la nueva versión..."
kubectl set image deployment/${BACKEND_DEPLOYMENT} backend=${BACKEND_IMAGE} -n ${BACKEND_NAMESPACE}
kubectl scale deployment/${BACKEND_DEPLOYMENT} --replicas=1 -n ${BACKEND_NAMESPACE}
kubectl rollout status deployment/${BACKEND_DEPLOYMENT} -n ${BACKEND_NAMESPACE} --timeout=120s

# Testear el backend
if run_tests; then
  echo "TESTS OK. Escalando backend a ${REPLICAS_PRODUCTION} réplicas..."
  kubectl scale deployment/${BACKEND_DEPLOYMENT} --replicas=${REPLICAS_PRODUCTION} -n ${BACKEND_NAMESPACE}
  kubectl rollout status deployment/${BACKEND_DEPLOYMENT} -n ${BACKEND_NAMESPACE} --timeout=120s
  echo "BACKEND ACTUALIZADO A LA NUEVA VERSIÓN"
else
  echo "ERROR EN LOS TESTS. REVERTIENDO CAMBIOS EN EL BACKEND..."
  revert_backend
  exit 1
fi

# Actualizar el frontend
echo "Actualizando frontend a la nueva versión..."
kubectl set image deployment/${FRONTEND_DEPLOYMENT} frontend=${FRONTEND_IMAGE} -n ${FRONTEND_NAMESPACE}
kubectl scale deployment/${FRONTEND_DEPLOYMENT} --replicas=1 -n ${FRONTEND_NAMESPACE}
kubectl rollout status deployment/${FRONTEND_DEPLOYMENT} -n ${FRONTEND_NAMESPACE} --timeout=120s

# Testear el frontend
if run_tests; then
  echo "TESTS OK. Escalando frontend a ${REPLICAS_PRODUCTION} réplicas..."
  kubectl scale deployment/${FRONTEND_DEPLOYMENT} --replicas=${REPLICAS_PRODUCTION} -n ${FRONTEND_NAMESPACE}
  kubectl rollout status deployment/${FRONTEND_DEPLOYMENT} -n ${FRONTEND_NAMESPACE} --timeout=120s
  echo "FRONTEND ACTUALIZADO A LA NUEVA VERSIÓN"
else
  echo "ERROR EN LOS TESTS. REVERTIENDO CAMBIOS EN EL FRONTEND..."
  revert_frontend
  revert_backend
  echo "DESPLIEGUE CANCELADO Y REVERTIDO"
  exit 1
fi