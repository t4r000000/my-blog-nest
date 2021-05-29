FROM node:16-buster-slim

ENV APP_HOME /app
WORKDIR $APP_HOME

RUN apt-get update && apt-get install -y --no-install-recommends curl git apt-utils build-essential procps sqlite3
RUN apt-get install -y apt-transport-https ca-certificates gnupg

COPY . .
RUN npm i -g @nestjs/cli

ENTRYPOINT ["tail","-f","/dev/null"]