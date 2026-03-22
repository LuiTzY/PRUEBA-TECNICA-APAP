# Prueba Técnica APAP - API Node.js

API REST sencilla desarrollada con Express.js para la prueba técnica de la posición DevOps Middle en APAP.

## Requisitos Previos
- Node.js >= 18.x
- npm >= 9.x

## Instalación
```bash
npm install
```

## Ejecución Local
```bash
npm start
```
La API estará disponible en `http://localhost:3000`

## Endpoints
| Método | Ruta        | Descripción           |
|--------|-------------|-----------------------|
| GET    | /           | Mensaje principal     |
| GET    | /health     | Health check          |
| GET    | /api/info   | Info de la API        |

## Pruebas
```bash
npm test
```

---

> **NOTA:** Esta aplicación es el punto de partida para la prueba técnica.
> El candidato debe completar los entregables descritos en el documento de la prueba.




Pasos para instalar y monitorear con grafana en el cluster

Para monitorear nuestro cluster de kubernetes debemos de instalar el manejador de paquetes helm.
Para esto lo podemos hacer directamente via consola usand nuestro archivo de config del cluster.

## Esto en windows
    winget install Helm.Helm


Siguiente agregamos el repo de prometheus

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts --kubeconfig=k8s-1-35-1-do-0-nyc1-17741307752-kubeconfig.yaml


helm repo update --kubeconfig=k8s-1-35-1-do-0-nyc1-17741307752-kubeconfig.yaml


Tomamos o creamos un archivo de custom-values, donde basicamente tendremos 2 servicios que se expondran publicamente que son el grafana y prometheus.



helm upgrade --install kube-prometheus-stack prometheus-community/kube-prometheus-stack -f ./values.yaml --kubeconfig=k8s-1-35-1-do-0-nyc1-17741307752-kubeconfig.yaml


Una vez instalado obtenemos los servicios

kubectl get services --kubeconfig=k8s-1-35-1-do-0-nyc1-17741307752-kubeconfig.yaml
