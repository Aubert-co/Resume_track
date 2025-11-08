import { Vacancies } from "types"

export type CountQuery = {
   count:number
}

export type SelectLink = {
   id:number,
   vacancy_id:number,
   link_label:string,
   original_link:string,
   created_at:string,
   code:string
}

export type CountAccess = {
   total_accessed_links:number
}

export type VacanciesWithLinks =Vacancies & {
   total_accesses:number
}
