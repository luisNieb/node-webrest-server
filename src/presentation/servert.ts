
import express from 'express';
import path from 'path';


interface Options {
    port:number ;
    publicPath:string ;
}

export class Server{

    private app=express()
    private readonly port:number
    private readonly publicPath:string

    //costructor para el server
    constructor(options: Options){
        const {port , publicPath} = options
        this.port = port
        this.publicPath = publicPath

    }

     async start(){

        //public folder
        this.app.use(express.static(this.publicPath))


        this.app.get('*' ,(req,res)=>{
            const indexPath = path.join(__dirname +`../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath)
        })
           
        //escuchar las peticiones
        this.app.listen(this.port,()=>{
            console.log("server running on por "+ this.port)
        })

     }


}