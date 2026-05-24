# 🚀 Project 4 — Kustomize + ArgoCD GitOps Platform

## 📌 Overview

This project demonstrates a complete multi-environment GitOps deployment platform using:

* Kubernetes
* Minikube
* Kustomize
* ArgoCD
* GitHub Actions
* DockerHub
* Node.js
* Express.js
* Ingress NGINX

The platform follows modern GitOps principles where:

* Git acts as the single source of truth
* ArgoCD continuously reconciles cluster state
* GitHub Actions automates image builds and GitOps updates
* Kustomize overlays manage multiple environments
* Kubernetes performs rolling deployments automatically

---

# 🏗️ Architecture

```text
Developer
   ↓
Git Push
   ↓
GitHub Actions
   ↓
Docker Image Build
   ↓
DockerHub Push
   ↓
GitOps Repository Update
   ↓
ArgoCD Application
   ↓
Kustomize Overlay Rendering
   ↓
Kubernetes Rolling Update
   ↓
Ingress
   ↓
Browser
```

---

# 🧰 Tech Stack

| Tool           | Purpose                         |
| -------------- | ------------------------------- |
| Kubernetes     | Container orchestration         |
| Minikube       | Local Kubernetes cluster        |
| ArgoCD         | GitOps platform                 |
| Kustomize      | Kubernetes customization engine |
| GitHub Actions | CI automation                   |
| DockerHub      | Container registry              |
| Node.js        | Backend runtime                 |
| Express.js     | Web framework                   |
| Ingress NGINX  | External traffic routing        |

---

# 📁 Repository Structure

## Application Repository

```text
kustomize-argocd-weather-app
│
├── .github/workflows
│   └── docker-build.yml
│
├── Dockerfile
├── .dockerignore
├── package.json
├── server.js
└── ...
```

---

## GitOps Repository

```text
kustomize-argocd-gitops
│
├── base
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── kustomization.yaml
│
├── overlays
│   ├── dev
│   │   ├── replica-patch.yaml
│   │   └── kustomization.yaml
│   │
│   └── prod
│       ├── replica-patch.yaml
│       ├── ingress-patch.yaml
│       └── kustomization.yaml
│
└── argocd
    ├── application.yaml
    └── prod-application.yaml
```

---

# ⚙️ Application Features

* Weather dashboard UI
* Environment-specific deployments
* Responsive design
* Version information
* Multi-environment GitOps architecture
* ArgoCD visual synchronization
* Kubernetes-ready deployment

---

# 🌍 Environments

| Environment | Namespace             | Replicas | URL                          |
| ----------- | --------------------- | -------- | ---------------------------- |
| Dev         | kustomize-argocd-demo | 2        | weather-dashboard.local      |
| Prod        | kustomize-argocd-prod | 4        | weather-dashboard-prod.local |

---

# 🐳 Dockerization

## Docker Build

```powershell
docker build -t shivawmm1810/weather-dashboard-app:v1 .
```

---

## Run Container

```powershell
docker run -d -p 3003:3000 --name weather-dashboard-container shivawmm1810/weather-dashboard-app:v1
```

---

## Access Application

```text
http://localhost:3003
```

---

# 🔄 CI/CD Workflow

## GitHub Actions Responsibilities

* Build Docker image
* Push image to DockerHub
* Clone GitOps repository
* Update Kustomize image tag
* Commit updated GitOps state
* Push changes back to GitHub

---

# 🔐 GitHub Secrets

| Secret          | Purpose                          |
| --------------- | -------------------------------- |
| DOCKER_USERNAME | DockerHub username               |
| DOCKER_PASSWORD | DockerHub access token           |
| GITOPS_TOKEN    | GitHub PAT for GitOps repository |

---

# ☸️ Kustomize Concepts Used

## Base

Reusable Kubernetes manifests.

Base contains:

* Deployment
* Service
* Ingress

Base is environment-agnostic.

---

## Overlays

Environment-specific customizations.

Examples:

* replica count
* ingress hosts
* namespaces
* image tags

---

## Strategic Patches

Used for partial YAML modifications.

Example:

```yaml
replicas: 4
```

without modifying base manifests.

---

## Image Transformers

Used to dynamically update image tags:

```yaml
images:
  - name:
    newTag:
```

---

# 🏗️ Multi-Environment Architecture

## DEV Overlay

Features:

* 2 replicas
* development namespace
* auto-updated image SHA

---

## PROD Overlay

Features:

* 4 replicas
* isolated production namespace
* separate ingress hostname
* controlled SHA promotion

---

# 🔁 ArgoCD GitOps Flow

ArgoCD continuously:

1. Watches Git repository
2. Detects desired state changes
3. Renders Kustomize overlays
4. Applies manifests to cluster
5. Performs rolling updates
6. Detects cluster drift
7. Self-heals resources automatically

---

# 🚀 Deployment Steps

## Start Minikube

```powershell
minikube start --driver=docker
```

---

## Enable Ingress

```powershell
minikube addons enable ingress
```

---

## Start Tunnel

> Run PowerShell as Administrator

```powershell
minikube tunnel
```

---

## Verify Cluster

```powershell
kubectl get nodes
```

---

## Verify Pods

```powershell
kubectl get pods -A
```

---

# 🌍 Access ArgoCD UI

## Port Forward

```powershell
kubectl port-forward svc/argocd-server -n argocd 8081:443
```

---

## Open Browser

```text
https://localhost:8081
```

---

# 🔑 ArgoCD Login

## Username

```text
admin
```

---

## Get Password

```powershell
kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath="{.data.password}"
```

Decode:

```powershell
[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String("<SECRET>"))
```

---

# 📄 ArgoCD Applications

## DEV Application

Deploys:

```text
overlays/dev
```

---

## PROD Application

Deploys:

```text
overlays/prod
```

---

# 🌐 Hosts File Configuration

Open:

```text
C:\Windows\System32\drivers\etc\hosts
```

Add:

```text
127.0.0.1 weather-dashboard.local
127.0.0.1 weather-dashboard-prod.local
```

---

# 🌍 Access Applications

## DEV

```text
http://weather-dashboard.local
```

---

## PROD

```text
http://weather-dashboard-prod.local
```

---

# 🔍 ArgoCD Features Demonstrated

## Automated Sync

ArgoCD automatically applies Git changes.

---

## Self Healing

If cluster state drifts from Git:

ArgoCD restores desired state automatically.

---

## Drift Detection

ArgoCD visually shows:

```text
OutOfSync
```

when cluster differs from Git.

---

## Visual GitOps

ArgoCD UI shows:

* sync status
* health status
* deployment tree
* rollout history
* resource relationships

---

# 📈 Rolling Update Demo

Watch deployments live:

```powershell
kubectl get pods -n kustomize-argocd-demo -w
```

Observe:

* new pod creation
* old pod termination
* zero downtime rollout

---

# ♻️ Self-Healing Demo

Delete a pod manually:

```powershell
kubectl delete pod <pod-name> -n kustomize-argocd-demo
```

Kubernetes automatically recreates it.

---

# ⚠️ Drift Detection Demo

Manually edit deployment:

```powershell
kubectl edit deployment weather-dashboard-app -n kustomize-argocd-demo
```

ArgoCD UI will show:

```text
OutOfSync
```

Then ArgoCD restores desired state automatically.

---

# 🚦 Environment Promotion Strategy

## DEV

GitHub Actions automatically updates image SHA.

---

## PROD

Image SHA is promoted manually after validation.

This demonstrates:

* safer production deployments
* immutable deployments
* controlled release management

---

# 🧠 Important Concepts Learned

* GitOps
* ArgoCD Applications
* Kustomize overlays
* multi-environment deployments
* image transformers
* drift detection
* selfHeal
* immutable deployments
* environment promotion
* Kubernetes ingress
* rolling updates
* GitHub Actions automation
* Docker image lifecycle

---

# ⚖️ Helm vs Kustomize

| Helm                | Kustomize               |
| ------------------- | ----------------------- |
| Template generation | YAML patching           |
| values.yaml         | overlays                |
| Package manager     | Customization engine    |
| Go templates        | Strategic merge patches |

---

# 🎯 Project Outcomes

✅ Node.js weather dashboard containerized

✅ DockerHub integration completed

✅ GitHub Actions CI pipeline configured

✅ Kustomize multi-environment overlays implemented

✅ ArgoCD applications configured

✅ Automated GitOps deployment working

✅ DEV and PROD environments isolated

✅ Kubernetes ingress routing enabled

✅ Rolling updates functioning

✅ Immutable image deployments implemented

✅ Environment promotion demonstrated

---

# 📚 Useful Commands

## Start Cluster

```powershell
minikube start --driver=docker
```

---

## Stop Cluster

```powershell
minikube stop
```

---

## Start Tunnel

```powershell
minikube tunnel
```

---

## Check Pods

```powershell
kubectl get pods -A
```

---

## Check DEV Pods

```powershell
kubectl get pods -n kustomize-argocd-demo
```

---

## Check PROD Pods

```powershell
kubectl get pods -n kustomize-argocd-prod
```

---

## Check Ingress

```powershell
kubectl get ingress -A
```

---

## Check ArgoCD Applications

```powershell
kubectl get applications -n argocd
```

---

## Check Application Details

```powershell
kubectl describe application weather-dashboard-prod -n argocd
```

---

# 🏁 Final Result

This project demonstrates a production-style multi-environment GitOps platform using:

* ArgoCD
* Kustomize
* GitHub Actions
* DockerHub
* Kubernetes
* automated reconciliation
* environment overlays
* immutable deployments
* environment promotion
* drift detection
* self healing

This architecture closely resembles real enterprise Kubernetes GitOps environments used in modern DevOps platforms.
