FROM alpine
WORKDIR project
ADD . /project

RUN apk add --update nodejs npm
RUN apk update && apk add bash

RUN chmod -R 0777 init.sh

RUN npm install