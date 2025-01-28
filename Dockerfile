FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]

# Build the image
# docker build -t pharmacy-service .

# Run the container with environment variables
# docker run -p 8080:8080 --env-file .env pharmacy-service