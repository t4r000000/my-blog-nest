FROM node:16-buster-slim AS build-stage

WORKDIR /app
COPY . ./
RUN npm install && npm run build

FROM node:16-buster-slim as production-stage

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY

ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}

WORKDIR /app
COPY --from=build-stage /app/package.json /app
COPY --from=build-stage /app/dist /app/dist

RUN npm install --production
CMD ["npm","run", "start:prod"]
