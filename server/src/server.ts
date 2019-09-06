import express from "express";
import { App } from "./api/app";
import { Routes } from "./api/routes";

class Server {
  private app: express.Application;
  private routs: express.Router;
  private port: any;

  constructor() {
    this.app = new App().app;
    this.routs = new Routes().appRouts;
    this.port = process.env.PORT || 3000;

    this.initRouts();
    this.listen();
  }

  private initRouts() {
    this.app.use("/", this.routs);

    // this.app.get("/", (req, res) => {
    //   res.send("Welcome");
    // });
  }

  private listen() {
    this.app.listen(this.port, () => {
      console.log("Server started on port: " + this.port);
    });
  }
}

const server = new Server();
