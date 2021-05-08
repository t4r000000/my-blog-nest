FROM node:16-buster-slim

ENV APP_HOME /app
WORKDIR $APP_HOME

RUN apt-get update && apt-get install -y --no-install-recommends curl git apt-utils build-essential apt-transport-https ca-certificates
RUN update-ca-certificates
COPY . .
RUN npm i -g @nestjs/cli

ENTRYPOINT ["tail","-f","/dev/null"]