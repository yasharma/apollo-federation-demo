FROM node:16.3.0-alpine AS BUILD_IMAGE
RUN apk --update add curl bash
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

LABEL authors="Yash sharma <yash@saal.ai>"

RUN mkdir /app
WORKDIR /app

COPY ["./package.json", "package-lock.json", "./"]
RUN npm install --production 
COPY . ./

# run node prune
RUN /usr/local/bin/node-prune

# remove unused dependencies
RUN rm -rf node_modules/rxjs/src/
RUN rm -rf node_modules/rxjs/bundles/
RUN rm -rf node_modules/rxjs/_esm5/
RUN rm -rf node_modules/rxjs/_esm2015/
RUN rm -rf node_modules/swagger-ui-dist/*.map
RUN rm -rf node_modules/couchbase/src/

FROM node:16.3.0-alpine
WORKDIR /app
# copy from build image
COPY --from=BUILD_IMAGE /app ./
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

EXPOSE  80

CMD ["node", "index.js"]