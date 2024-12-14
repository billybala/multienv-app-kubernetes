#!/usr/bin/env bash
set -e

kubectl create namespace backend
kubectl create namespace frontend
kubectl create namespace database
kubectl create namespace cache
kubectl create namespace monitoring
