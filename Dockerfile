FROM node:16-buster-slim AS build-stage

WORKDIR /app
COPY . ./
RUN npm install && npm run build

FROM node:16-buster-slim as production-stage

ARG AWS_ACCESS_KEY
ARG AWS_SECRET_ACCESS
ARG OIDC_CLIENT_SECRET

ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS}
ENV OIDC_CLIENT_SECRET=${OIDC_CLIENT_SECRET}

WORKDIR /app
COPY --from=build-stage /app/package.json /app
COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/.env.example /app/dist/.env

RUN npm install --production
CMD ["npm","run", "start:prod"]
