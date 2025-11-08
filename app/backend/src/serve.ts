import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import { Repository } from "./repository";
import { Service } from "./service";
import { Database } from "./database/db";
import path from "path";
import cors from 'cors'
const db = new Database()

const repository = new Repository(db)
const service = new Service(repository)

const app = express()
const publicPath = path.join(__dirname,'..', "public");

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.get('/*splat',(req,res)=>{
    res.sendFile(publicPath+'/index.html')
})

app.post('/create/vacancy',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {vacancy_level,link_vacancy,status,plataform,description,resume_used}  =req.body
        
        if (!link_vacancy) return res.status(400).json({ message: 'Link vacancy is required.' });
        if (!vacancy_level) return res.status(400).json({ message: 'Vacancy level is required.' });
        if (!status) return res.status(400).json({ message: 'Status is required.' });
        if (!plataform) return res.status(400).json({ message: 'Plataform is required.' });
        if (!description) return res.status(400).json({ message: 'Description is required.' });
        if (!resume_used) return res.status(400).json({ message: 'Resume used is required.' });
        
        await service.createVacancy({
            vacancy_level,linkVacancy:link_vacancy,
            status,plataform,description,resume_used
        })
        res.status(201).send({message:'sucess'})
    }catch(err:unknown){
        next(err)
    }
})
app.post('/generate-link',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {vacancy_id,original_link,link_label} =  req.body
        if (!vacancy_id) return res.status(400).json({ error: 'Missing vacancy_id' });
        if (!original_link) return res.status(400).json({ error: 'Missing original_link' });

        
        await service.createAcessLink({
            link_label,
            original_link,
            vacancy_id,
        })
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
        const datas = await service.countAccessedLinks()
    
        res.status(200).send({message:'success',datas})
    }catch(err:unknown){
        next(err)
    }
})
app.get('/get/links/:link',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const links = req.params.link
        if(!links)return res.status(400).send({message:'link is required'})
        const datas = await service.selectLinks( Number(links) )
        res.status(200).send({message:'succes',datas})
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
 
app.listen(process.env.PORT,()=>{
    console.log('running')
})