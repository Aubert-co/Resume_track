import { Vacancies } from "types"

export type CountQuery = {
   count:number
}

export type SelectLink = {
   id:number,
   vacancy_id:number,
   new_link:string,
   original_link:string,
   created_at:string
}

export type CountAccess = {
   total_accessed_links:number
}

export type VacanciesWithLinks =Vacancies & {
   new_link:string,
   original_link:string,
   total_accesses:number
}
