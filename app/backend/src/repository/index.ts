import { DatabaseInt } from "database/db";
import { CreateAcessDTO,CreateVacancyDTO } from "types";
import { CountAccess, CountQuery, VacanciesWithLinks } from "types/database.types";


export interface IRepository{
countVacancy(vacancy_id:number):Promise<number>
selectVacancies():Promise<VacanciesWithLinks[]>
createVacancy({linkVacancy,description,resume_used,vacancy_level,status}:CreateVacancyDTO):Promise<void>
createAcessLink({original_link,vacancy_id,new_link}:CreateAcessDTO):Promise<void>
countAccess(selectNull:boolean):Promise<CountAccess>

}

export class Repository implements IRepository{

    constructor(protected db:DatabaseInt){}

    async countVacancy(vacancy_id:number):Promise<number>{
        try{
            const sql = "SELECT * FROM vacancies WHERE id = $1 LIMIT 1";
            const select = await this.db.query<CountQuery>(sql,[vacancy_id])
            return select.rows[0].count
        }catch(err:unknown){
            throw new Error("Failed to select a vacancy")
        }
    }
    async selectVacancies():Promise<VacanciesWithLinks[]>{
        try{
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
            const values = await this.db.query<VacanciesWithLinks>( sql )
            return values.rows
        }catch(err:unknown){
            throw new Error("failed to select")
        }
    }
    async createVacancy({linkVacancy,description,resume_used,vacancy_level,status}:CreateVacancyDTO):Promise<void>{
        try{
            const sql = `INSERT INTO vacancies VALUES(link_vacancy,description,resume_used,vacancy_level,status)
                VALUES($1,$2,$3,$4,$5)` ;

            await this.db.query(sql,[linkVacancy,description,resume_used,vacancy_level,status])
        }catch(err:unknown){
            throw new Error("failed to create a vacancy")
        }
    }
    async createAcessLink({original_link,new_link,vacancy_id}:CreateAcessDTO):Promise<void>{
        try{
            const sql = 'INSERT INTO links(original_link,new_link,vacancy_id) VALUES($1,$2,$3)'
            await this.db.query(sql,[original_link,new_link,vacancy_id])
        }catch(err:unknown){
            throw new Error("failed to create acess link")
        }
    }
    async countAccess(selectNull:boolean):Promise<CountAccess>{
        try{
            const isNull = selectNull ? "IS NULL" : "IS NOT NULL";

            const sql = `SELECT COUNT(*) AS total_accessed_links FROM accessed_links WHERE vacancy_id ${isNull}` ;

            const count = await this.db.query<CountAccess>(sql)
            return count.rows[0]
        }catch(err:unknown){
            throw new Error("failed to count total acessed links")
        }
    }
}