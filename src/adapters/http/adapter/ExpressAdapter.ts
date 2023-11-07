import express, { Request, Response } from 'express'
import { HttpServer } from "../HttpServer";

export class ExpressAdapter implements HttpServer {
    
    app: any

    constructor(){
        this.app = express()
        this.app.use(express.json())
    }

    on(method: string, url: string, callback: Function): void {
        this.app[method](url, async function(request: Request, response: Response) {
            try {
                const output = await callback(request.params, request.body, request.headers)
                response.json(output)
            } catch(e: any) {
                response.status(400).json({
                    message: e.message
                })
            }
        })
    }
    
    listen(port: number): void {
        this.app.listen(port)
    }
}