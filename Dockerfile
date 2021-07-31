FROM ubuntu:latest

ADD cicd-accelerator cicd-accelerator 

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install nodejs npm -y

WORKDIR cicd-accelerator

RUN npm install

CMD ["npm", "start"]

EXPOSE 3000