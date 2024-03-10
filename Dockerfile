FROM --platform=linux/amd64 node:18.13 as angular
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g @angular/cli
RUN npm run build-prod
CMD ng serve --host 0.0.0.0