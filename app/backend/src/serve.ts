import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { encodeId } from "constants/decodeUrl";
import { Repository } from "repository";
import { Service } from "service";
import { Database } from "database/db";

const db = new Database()

const repository = new Repository(db)
const service = new Service(repository)
const app = express()


app.post('/generate-link',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {vacancy_id,original_link} =  req.body
        if(!vacancy_id)return res.status(400).send({message:'vacancy id cannot be null'})
        if(!original_link)return res.status(400).send({message:'original_link cannot be null'})
        
        await service.createAcessLink(Number(vacancy_id),original_link)
        res.status(201).send({message:'sucess'})
    }catch(err:unknown){
        next(err)
    }
})
app.get('/resumes',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const datas = await service.selectVacancies()
        res.status(200).send({datas,message:'success'})
    }catch(err:unknown){
        next(err)
    }
})
app.get('/count/access',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const datas = await service.countAcessWithNoregister()
    
        res.status(200).send({message:'success',datas})
    }catch(err:unknown){
        next(err)
    }
})
app.use((error:ErrorRequestHandler,req:Request,res:Response)=>{
    if(error instanceof Error){
        res.status(500).send({message:error.message})
        return 
    }
    res.status(500).send({message:'unknown error'})
})
app.listen(3000,()=>{
    console.log('running')
})