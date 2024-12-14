#!/usr/bin/env bash
set -e

kubectl apply -f k8s/backend/backend-deployment.yaml -n backend
kubectl apply -f k8s/frontend/frontend-deployment.yaml -n frontend

kubectl apply -f k8s/backend/backend-service.yaml -n backend
kubectl apply -f k8s/frontend/frontend-service.yaml -n frontend

kubectl apply -f k8s/frontend/shared-storage/shared-pv.yaml -n frontend
kubectl apply -f k8s/frontend/shared-storage/shared-pvc.yaml -n frontend

kubectl apply -f k8s/frontend/nginx/nginx-config.yaml -n frontend

kubectl apply -f k8s/frontend/frontend-ingress.yaml -n frontend

kubectl apply -f k8s/mongodb/mongo-deployment.yaml -n database
kubectl apply -f k8s/mongodb/mongo-service.yaml -n database
kubectl apply -f k8s/mongodb/mongo-pvc.yaml -n database

kubectl apply -f k8s/redis/redis-deployment.yaml -n cache
kubectl apply -f k8s/redis/redis-service.yaml -n cache

kubectl apply -f k8s/monitoring/alertmanager/alertmanager-deployment.yaml -n monitoring
kubectl apply -f k8s/monitoring/alertmanager/alertmanager-service.yaml -n monitoring

kubectl apply -f k8s/monitoring/grafana/grafana-deployment.yaml -n monitoring
kubectl apply -f k8s/monitoring/grafana/grafana-service.yaml -n monitoring
kubectl apply -f k8s/monitoring/grafana/grafana-pvc.yml -n monitoring

kubectl apply -f k8s/monitoring/loki/loki-deployment.yaml -n monitoring
kubectl apply -f k8s/monitoring/loki/loki-service.yaml -n monitoring

kubectl apply -f k8s/monitoring/prometheus/prometheus-deployment.yaml -n monitoring
kubectl apply -f k8s/monitoring/prometheus/prometheus-service.yaml -n monitoring   

kubectl apply -f k8s/monitoring/promtail/promtail-daemonset.yaml -n monitoring

kubectl apply -f k8s/monitoring/config-maps/alertmanager.yml -n monitoring
kubectl apply -f k8s/monitoring/config-maps/cpu-high.rules.yml -n monitoring
kubectl apply -f k8s/monitoring/config-maps/loki-config.yml -n monitoring
kubectl apply -f k8s/monitoring/config-maps/prometheus.yml -n monitoring
kubectl apply -f k8s/monitoring/config-maps/promtail-config.yml -n monitoring
