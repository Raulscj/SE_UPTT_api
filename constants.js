import * as dotenv from "dotenv";
dotenv.config();

const verifyEnvVariable = (name) => {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} variable is undefined or empty`);
  }

  return value;
};
export const { PORT } = process.env;

export const EXPIRES = verifyEnvVariable("EXPIRES");
export const DATABASE = verifyEnvVariable("DATABASE");
export const SECRET = verifyEnvVariable("TOKEN_SECRET");
