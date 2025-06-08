import express from "express";
import * as http from "http";

class Server {
  _app;
  _port;
  _server;

  constructor(serverConf) {
    this._app = express();
    this._port = serverConf.port || 3000;

    if (serverConf.middleWares) {
      this._middlewares(serverConf.middleWares);
    }

    if (serverConf.routes) {
      this._routes(serverConf.routes);
    }
  }

  _middlewares(middleWares) {
    middleWares.forEach((middleWare) => this._app.use(middleWare));
  }

  _routes(routes) {
    routes.forEach((route) => this._app.use(route));
  }

  listen() {
    this._server = http.createServer(this._app);
    this._server.listen(this._port, () => {
      console.log(`App listening on port ${this._port}`);
    });
  }
}

export default Server;
