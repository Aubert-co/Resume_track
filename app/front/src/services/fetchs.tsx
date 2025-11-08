import type {  UsableFetch} from "../types/index.types";


export const usableFetch = async<T,B>({setDatas,service,body}:UsableFetch<T,B>)=>{
  try{
      const {datas,message,status} = await service(body)
      setDatas({datas,message,status})
  }catch(err:unknown){
    setDatas({datas:[] as T,message:'Algo deu errado!',status:500})
  }
}


