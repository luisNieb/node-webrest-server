import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  routes:Router;
  publicPath?: string;
  
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath?: string;
  private readonly routes:Router;

  //costructor para el server
  constructor(options: Options) {
    const { port,routes, publicPath = "public" } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {
    //public folder
    this.app.use(express.static(this.publicPath || "public"));

    //*Middeleware
    this.app.use(express.json())// raw
    this.app.use(express.urlencoded({ extended:true }));// x-www-form-urlencoded



    //* routes
    this.app.use(this.routes)



    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    //escuchar las peticiones
    this.app.listen(this.port, () => {
      console.log("server running on por " + this.port);
    });
  }
}
