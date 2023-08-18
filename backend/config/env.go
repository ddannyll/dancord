package config

import (
	"os"

	"github.com/joho/godotenv"
)

type EnvVars struct {
    DSN string
    LISTEN_ON string
    PORT string
}

func LoadEnv() EnvVars {
    godotenv.Load()
    dsn, exists := os.LookupEnv("DSN")
    if !exists {
        panic("Failed to load environment variables! Is .env setup correctly?")
    }
    listen_on, exists := os.LookupEnv("LISTEN_ON")
    if !exists {
        listen_on = "127.0.0.1"
    }
    port, exists := os.LookupEnv("PORT")
    if !exists {
        port = "8080"
    }
    return EnvVars{
        DSN: dsn,
        LISTEN_ON: listen_on,
        PORT: port,
    }
    
}