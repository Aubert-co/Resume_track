import type { CountAccess, GetResumes, Links, Response } from "../types/index.types"

type GenerateLinkDTO = {
  vacancy_id:number,
  original_link:string,
  link_label:string
}


export const generateLink = async({vacancy_id,original_link,link_label}:GenerateLinkDTO)
:Promise<Response<void>>=>{
    try{
        const response = await fetch('/generate-link',({
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({vacancy_id,original_link,link_label})
        }))
        const values = await response.json()
        if(!response.ok){
            return {message:values.message,status:response.status}
        }
        return {message:values.message,status:response.status}
    }catch(err:unknown){
        return {message:'Algo deu errado!',status:500}
    }
}
export type BodyGetLink = {
    id:number
}
export const getLinkByVacancyId = async(body?:BodyGetLink):Promise<Response<Links[]>>=>{
    try{
        const response = await fetch(`/linkby/${body?.id}`,{
            method:'GET',
        })
        const {datas,message} = await response.json()
        
        return {datas,message,status:201}
    }catch(err:any){
        return {message:'',status:500,datas:[]}
    }
}

export const getResumes = async():Promise<Response<GetResumes[]>>=>{
    try{
        const response = await fetch('/resumes',{
            method:'GET',
        })
        const {message,datas} =await response.json()
        if(!response.ok){
            return {message,status:response.status}
        }
      
        return {datas,status:201,message:'sucess'}
    }catch(err:unknown){
        return {message:'Algo deu errado',status:500,datas:[]}
    }
}

export const countAccess = async():Promise<Response<CountAccess[]>>=>{
    try{
        const response = await fetch('/count/access')
        const { message,datas} = await response.json()
        if(!response.ok){
            return {message,status:response.status,datas:[]}
        }
        
        return {message,datas,status:response.status}
    }catch(err:unknown){
        return {message:'Algo deu errado',status:500,datas:[]}
    }
}