**Build Docker Image**
For development:
docker build -t (name)

For production:
docker build -f Dockerfile.prod -t sample:prod .

**Run Docker Container**
docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true dev

**Docker Compose**
docker-compose up -d --build