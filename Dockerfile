FROM node:latest AS build

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY *.json /app/
COPY src src
RUN npm run build --target=production

FROM nginx:alpine

COPY --from=build /app/dist/* /usr/share/nginx/html/