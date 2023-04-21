FROM golang:1.20.0

WORKDIR /usr/src/wemall

COPY ./golang /usr/src/wemall/golang

COPY ./go.mod /usr/src/wemall/go.mod
COPY ./go.sum /usr/src/wemall/go.sum
COPY ./main.go /usr/src/wemall/main.go
COPY ./configuration.json /usr/src/wemall/configuration.json
COPY ./upload /usr/src/wemall/app/upload
RUN go env -w GOPROXY=https://goproxy.cn,direct
RUN go mod tidy
RUN go mod download
RUN ls && pwd