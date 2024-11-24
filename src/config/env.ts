import dotenv from "dotenv";
dotenv.config();

interface EnvVars {
  DATABASE_URL: string;
  PORT: number;
  NODE_ENV: "development" | "production" | "test";
}

// Validate and cast environment variables
const getEnv = (): EnvVars => {
  const { DATABASE_URL, PORT, NODE_ENV } = process.env;

  if (!DATABASE_URL) throw new Error("DATABASE_URL is required");
  if (!PORT) throw new Error("PORT is required");
  if (!NODE_ENV) throw new Error("NODE_ENV is required");

  return {
    DATABASE_URL,
    PORT: parseInt(PORT, 10),
    NODE_ENV: NODE_ENV as "development" | "production" | "test",
  };
};

export const env = getEnv();
