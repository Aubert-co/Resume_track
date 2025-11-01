import { DatabaseInt } from "database/db";
import { IncreaseAcess } from "types";
import { CountQuery,SelectLink } from "types/database.types";


export interface IRepository{

}
type CreateVacancy = {
    linkVacancy:string,
    description:string,
    resume_used:string,
    vacancy_level:string,
    status:string
}
export class Repository implements IRepository{

    constructor(protected db:DatabaseInt){}

    async selectVacancies(){
        const sql = `SELECT 
            v.*, 
            l.new_link, 
            l.original_link, 
            COUNT(a.id) AS total_accesses
            FROM vacancies v
            LEFT JOIN links l ON v.id = l.vacancy_id
            LEFT JOIN accessed_links a ON v.id = a.vacancy_id
            GROUP BY v.id, l.new_link, l.original_link;
        `
        const values = await this.db.query( sql )
    }
    async createVacancy({linkVacancy,description,resume_used,vacancy_level,status}:CreateVacancy):Promise<void>{
        const sql = `INSERT INTO vacancies VALUES(link_vacancy,description,resume_used,vacancy_level,status)
        VALUES($1,$2,$3,$4,$5)` ;

        const insert = await this.db.query(sql,[linkVacancy,description,resume_used,vacancy_level,status])
    }
    async countAcess(){
        const sql = "SELECT COUNT(*) accessed_links"
    }
}