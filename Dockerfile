FROM node:18.13 as angular
RUN npm install -g @angular/cli
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ng serve --host 0.0.0.0