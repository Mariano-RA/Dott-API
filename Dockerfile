
FROM node:lts-slim AS builderBack
WORKDIR "/back"
COPY . .
RUN npm install
RUN npm run build
RUN npm prune --production

FROM node:lts-slim AS builderFront
WORKDIR "/front"
COPY client/ .

FROM node:lts-slim AS production
WORKDIR "/app"
COPY --from=builderBack /back/package.json ./package.json
COPY --from=builderBack /back/package-lock.json ./package-lock.json
COPY --from=builderBack /back/dist ./dist
COPY --from=builderBack /back/node_modules ./node_modules
COPY --from=builderBack /back/database ./database
COPY --from=builderFront /front /app/client

CMD [ "sh", "-c", "npm run prod"]

# Para ejecutar usamos
# docker build -t dott-api .
# docker run -p 3000:3000 dott-api
