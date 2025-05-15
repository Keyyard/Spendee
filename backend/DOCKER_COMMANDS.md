docker build -t spendee-backend .

# Docker Commands Reference (Windows/PowerShell)

| Command                                                                 | Usage/Description                                                                                  | When to Use                                                                                   |
|-------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `docker build -t spendee-backend .`                                     | Build a Docker image named `spendee-backend` from the Dockerfile in the current directory.        | Whenever you change the Dockerfile, requirements.txt, or any code/config that affects sthe image. |
| `docker run -d -p 8000:8000 --name spendee-backend spendee-backend`     | Run the container in detached mode, mapping port 8000.                                            | To start your backend container after building the image.                                     |
| `docker ps`                                                             | List all running containers.                                                                      | To check if your backend container is running.                                                |
| `docker stop spendee-backend`                                           | Stop the running backend container.                                                               | When you want to stop the backend without removing it.                                        |
| `docker start spendee-backend`                                          | Start a stopped backend container.                                                                | To restart the backend after stopping it.                                                     |
| `docker rm spendee-backend`                                             | Remove the backend container.                                                                     | To delete the container (e.g., before re-running with different settings).                    |
| `docker logs spendee-backend`                                           | View logs from the backend container.                                                             | To debug or monitor the backend output.                                                       |
| `docker-compose up --build -d`                                          | Build and run all services defined in docker-compose.yml in detached mode.                        | If you use Docker Compose (e.g., for multi-container setups or DB), and want to rebuild/run.  |
| `docker-compose down`                                                   | Stop and remove all containers and networks from docker-compose.yml.                              | To clean up after using Docker Compose.                                                       |
| `docker-compose logs -f`                                                | Follow logs from all services in docker-compose.yml.                                              | To monitor logs in real time when using Docker Compose.                                       |

---

## Typical workflow
1. Edit your code, Dockerfile, or requirements.txt as needed.
2. Run `docker build -t spendee-backend .` to rebuild the image if you made changes to the Dockerfile, requirements, or code. You can also use Docker Desktop (Windows) to visually manage images and containers at this step.
3. Run `docker run -d -p 8000:8000 --name spendee-backend spendee-backend` to start the backend container.
4. Use `docker ps` to list running containers, `docker logs spendee-backend` to view logs, and other commands in the table above to monitor and manage your container.
5. Use Docker Compose commands if you have a `docker-compose.yml` and want to manage multiple services (like a database and backend) together. Docker Compose is especially useful for local development with multiple containers.

## Notes
- The Dockerfile already uses `--host 0.0.0.0`, so the app will listen on all network interfaces, making it accessible from other devices on your network.
- Rebuild the image after any change to Dockerfile, requirements.txt, or code that is copied into the image.
- Make sure port 8000 is free.
- For more, see the [Docker docs](https://docs.docker.com/get-started/).
