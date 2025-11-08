export type Vacancies = {
    id:number,
    link_vacancy:string,
    description:string,
    resume_used:string,
    vacancy_level:string,
    status:string,
    created_at:string,
    plataform:string
}


export type IncreaseAcess ={
    vacancy_id:number
    source?:string | null
}

export type CreateVacancyDTO = {
    linkVacancy:string,
    description:string,
    resume_used:string,
    vacancy_level:string,
    status:string,
    plataform:string
}

export type CreateAcessDTO ={
    original_link:string,
    vacancy_id:number,
    code:string,
    link_label:string
}