# Installing n8n Locally with Docker

This guide uses Docker because it is the most stable local setup for experimenting with n8n workflows.

## 1. Install Docker

Download Docker Desktop from the official site:

[https://www.docker.com/](https://www.docker.com/)

Choose the installer for your operating system. The screenshots below use Windows.

![Docker download page](./N8N_INSTALL_GUIDE/image-20250912025341272.png)

During installation, you can choose a non-system drive for Docker data if your machine has limited space on `C:`.

![Docker install location](./N8N_INSTALL_GUIDE/image-20250912032540657.png)

## 2. Start n8n

Open PowerShell, Terminal, or another shell and run:

```bash
docker volume create n8n_data
docker run -d --restart unless-stopped --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n
```

Docker should now show the n8n container running.

![n8n running in Docker](./N8N_INSTALL_GUIDE/image-20250912033251997.png)

## 3. Open the n8n UI

Open:

[http://localhost:5678](http://localhost:5678)

The Docker port mapping `5678:5678` exposes the n8n web UI on your local machine.

![n8n start page](./N8N_INSTALL_GUIDE/image-20250912033341666.png)

After setup, create a new workflow from the n8n dashboard.

![n8n new workflow](./N8N_INSTALL_GUIDE/image-20250912034040656.png)

## 4. Add Nodes

The main workflow surface has three common areas: workflow canvas, node search, and execution/testing controls.

![n8n workflow UI](./N8N_INSTALL_GUIDE/image-20250912234709064.png)

Use the add-node button to search for integrations or select nodes from the catalog.

![n8n node search](./N8N_INSTALL_GUIDE/image-20250912234748845.png)

## Operational Notes

- Keep credentials in n8n credential storage, not in plain workflow notes.
- Pin input/output examples when testing LLM nodes.
- Version important workflows by exporting JSON and committing sanitized copies.
- Stop the container with `docker stop n8n` when it is not needed.
