# Kube-release
![project state alpha](https://img.shields.io/badge/project_state-alpha-red.svg)

**Note: this is project is currently in the Design phase.**

Kubernetes Deployments only manages the release lifecycle pods with a basic way of rolling back.
Kube-Release Manages the release cycle of multiple Kubernetes manifests as one Release. 
It is based on some principles from Helm/Tiller, but with a more robust architecture and better security.

## Template-engine Integration
Nowadays there are a lot of tools out there which generates Kubernetes manifests from smart templates, like [Helm](https://helm.sh) or [Kustomize](https://github.com/kubernetes-sigs/kustomize).
Kube-Release is not trying to outsmarting them, but rather integrate seamless with them. For example:
```bash
helm template . --name=my-release --namespace=my-project -f values | kube-release deploy my-release -f -
```
Choose the right tool for the right job.

## Features
* Manages multiple Kubernetes manifests as one Deployable unit
* Release history
* Rollback to previous revision
* Stores Releases in CRD (Custom Resource Definitions), so no need for external datastorage
* Integrate with any template engine
* Integrate with kubectl
* User friendly report of a failed Release, with a possible cause analysis.
* Prometheus metrics exporter for collecting Release metrics.

## Setup

```bash
npm install -g kube-release
```

## Usage
The **Kube-Release CLI** is inspired by **kubectl** and is designed to provide the same user experience.
It can also be used as an plugin to the **kubectl**, for example: 
```bash
kubectl release deploy my-release -f ./manifests
```

### Global options
These options can be used on any command
```bash
# Show help about a command
kube-release <command> -h

# Show kube-release version
kube-release -V
```

### Release lifecycle commands
```bash
# Deploy a new release or update an existing one
kube-release deploy <RELEASE_NAME> -f ./manifests

# Watch a release
kube-release status <RELEASE_NAME> --wait

# List releases
kube-release get <RELEASE_NAME>

# Delete a release
kube-release delete <RELEASE_NAME>

# Show revisions of a release
kube-release history <RELEASE_NAME>

# Rollback to a previous revision
kube-release rollback <RELEASE_NAME> <REVISION>
```

## Standalone
Run a light weight Prometheus metrics exporter for collecting Releases.
```bash
# Run prometheus metrics exporter
kube-release standalone
```


## License
MIT