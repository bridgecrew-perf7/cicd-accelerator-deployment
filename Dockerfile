FROM alpine:latest 

ADD supervisord.conf /root/supervisord.conf

RUN apk add nodejs npm curl supervisor

ADD cicd-accelerator-frontend cicd-accelerator-frontend

ADD cicd-accelerator-backend cicd-accelerator-backend

WORKDIR cicd-accelerator-backend

RUN npm install

WORKDIR /

WORKDIR cicd-accelerator-frontend

RUN npm install

#RUN npm run build

RUN npm install -g serve

WORKDIR /

EXPOSE 3001 3000

RUN mkdir -p /var/log/supervisor

WORKDIR /

VOLUME cicd-accelerator-backend/logs

CMD ["supervisord", "-c", "/root/supervisord.conf"]
