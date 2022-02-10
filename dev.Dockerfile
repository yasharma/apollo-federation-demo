FROM node:16.3.0-alpine
RUN apk --update add curl

LABEL authors="Yash sharma <yash@saal.ai>"

RUN mkdir /app
WORKDIR /app

COPY ["package.json", "debug.sh", "yarn.lock", "./"]

EXPOSE  80

CMD ["sh", "debug.sh"]
