FROM node:16 AS build

COPY package*.json ./

RUN npm install

COPY src/ /src/
COPY tsconfig.* /

RUN npm run build

FROM node:16

WORKDIR /

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --only=production

COPY --from=build /dist /dist
COPY knexfile.js /
COPY migrations/ /migrations/
COPY seeds/ /seeds/

EXPOSE 3000

CMD ["node", "/dist/main"]