FROM --platform=linux/amd64 node:18.13 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g @angular/cli
RUN npm run build-dev
FROM --platform=linux/amd64 nginx:alpine
COPY --from=builder /app/dist/eleague-online/browser /usr/share/nginx/html
EXPOSE 80  
CMD ["nginx", "-g", "daemon off;"]
# Use of runner.sh is an alternative approach to use ng serve, instead of nginx.
# CMD ["bash", "./runner.sh"]
# Optimize the steps above to build the static layers earlier to help with caching.
# Refer ELO-66