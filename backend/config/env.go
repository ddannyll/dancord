package config

import (
	"os"

	"github.com/joho/godotenv"
)

type EnvVars struct {
    DSN string
}

func LoadEnv() EnvVars {
    godotenv.Load()
    dsn, exists := os.LookupEnv("DSN")
    if !exists {
        panic("Failed to load environment variables! Is .env setup correctly?")
    }
    return EnvVars{
        DSN: dsn,
    }
    
}