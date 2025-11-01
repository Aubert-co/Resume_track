import { encodeId } from "constants/decodeUrl";
import { IRepository } from "repository";
import { IncreaseAcess } from "types";
import { SelectLink, VacanciesWithLinks } from "types/database.types";

type AcessType = {
    no_register:number,
    with_register:number
}
export class Service{
    constructor(protected repository:IRepository){}

    async createAcessLink(vacancy_id:number,original_link:string){
       
        const encoded = encodeId( vacancy_id )
    
        const existsVacancy = await this.repository.countVacancy(vacancy_id)
        if(existsVacancy === 0){
            throw new Error("no vacancies")
        }
        await this.repository.createAcessLink({
            original_link,
            vacancy_id,
            new_link:encoded
        })
       
    }
    async selectVacancies():Promise<VacanciesWithLinks[]>{
        return await this.repository.selectVacancies()
    }
    async countAcessWithNoregister():Promise<AcessType>{
        const withRegister =  await this.repository.countAccess(true)
        const withoutRegister = await this.repository.countAccess( false )
        return {no_register:withoutRegister.total_accessed_links , with_register:withRegister.total_accessed_links}
    }
}