declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    POSTGRES_URL: string
    PAYLOAD_SECRET: string
    BLOB_READ_WRITE_TOKEN: string
    NEXT_PUBLIC_SERVER_URL: string
  }
}
