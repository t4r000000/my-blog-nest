FROM node:16-buster-slim

ENV APP_HOME /app
WORKDIR $APP_HOME

RUN apt-get update && apt-get install -y --no-install-recommends curl git apt-utils build-essential procps sqlite3
RUN apt-get install apt-transport-https ca-certificates gnupg
RUN update-ca-certificates
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
RUN apt-get update && apt-get install google-cloud-sdk

COPY . .
RUN npm i -g @nestjs/cli

ENTRYPOINT ["tail","-f","/dev/null"]