import express, { Request, Response } from "express";
import { encodeId,decodeId } from "constants/decodeUrl";
import { Repository } from "repository";
import { Service } from "service";
import { Database } from "database/db";

const db = new Database()

const repository = new Repository(db)
const service = new Service(repository)
const app = express()

app.get('/resumes',async(Req:Request,res:Response)=>{
    
})
app.listen(3000,()=>{
    console.log('running')
})