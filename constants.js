import * as dotenv from "dotenv";
dotenv.config();

const verifyEnvVariable = (name) => {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} variable is undefined or empty`);
  }

  return value;
};
export const { PASSWORD, PORT } = process.env;

export const ADMIN = verifyEnvVariable("ADMIN");
export const DATABASE = verifyEnvVariable("DATABASE");
