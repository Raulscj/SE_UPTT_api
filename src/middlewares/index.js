import cors from "cors";
//TODO:import helmet from "helmet"; Para que sirve?
import morgan from "morgan";
import { json } from "express";

const middleWares = [
  morgan("tiny", { stream: { write: (m) => console.log(m.split("\n")[0]) } }),
  //helmet(),
  cors(),
  json(),
];

export default middleWares;
