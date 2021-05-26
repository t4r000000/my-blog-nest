FROM node:16-buster-slim AS build-stage

WORKDIR /app
COPY . ./
RUN npm install && npm build

FROM node:16-buster-slim as production-stage
WORKDIR /app
COPY --from=build-stage /app/package.json /app
COPY --from=build-stage /app/dist /app/dist

RUN npm install --production
CMD ["npm","run", "start:prod"]
