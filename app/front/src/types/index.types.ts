export type GetResumes = {
    id:number,
    link_vacancy:string,
    description:string,
    resume_used:string,
    vacancy_level:string,
    status:string,
    created_at:string
    new_link:string,
    original_link:string,
    total_accesses:number,
    plataform:string
}

export type Response<T> = {
    message?:string,
    datas?:T,
    status:number
}
export type CountAccess ={
    no_register:number,
    with_register:number
}
export type UsableFetch<T,B> = {
  setDatas:(args:{datas?:T,status:number,message?:string})=>void,
  service:(body?:B)=>Promise<Response<T>>,
  body?:B
}

export type Links = {
    id:number,
    new_link:string,
    code:string,
    link_label:string,
    plataform:string
}