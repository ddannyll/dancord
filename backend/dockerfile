FROM golang:1.21

WORKDIR /app

COPY . .

RUN go get

ENV LISTEN_ON=0.0.0.0

ENV PORT=8080

EXPOSE 8080

RUN go build -o bin .

ENTRYPOINT [ "/app/bin" ]