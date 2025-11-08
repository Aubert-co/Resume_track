import { encodeId } from "../constants/decodeUrl";
import { IRepository } from "../repository";
import { CreateAcessDTO, CreateVacancyDTO, IncreaseAcess } from "../types/index";
import { SelectLink, VacanciesWithLinks } from "../types/database.types";

type AcessType = {
    no_register:number,
    with_register:number
} 
type CreateAcess = Omit<CreateAcessDTO,'code'>
export class Service{
    constructor(protected repository:IRepository){}

    async createAcessLink({vacancy_id,link_label,original_link}:CreateAcess){
        link_label = link_label.toLocaleLowerCase()
        const encoded = encodeId( vacancy_id,link_label )
    
        const existsVacancy = await this.repository.countVacancy(vacancy_id)
        
        if(existsVacancy.length ===0){
            throw new Error("no vacancies")
        }
        await this.repository.createAcessLink({
            original_link,
            vacancy_id,
            code:encoded,
            link_label
        })
       
    }
    async createVacancy(datas:CreateVacancyDTO):Promise<void>{
        
        return await this.repository.createVacancy( datas )
    }
    async selectVacancies():Promise<VacanciesWithLinks[]>{
        return await this.repository.selectVacancies()
    }
    async countAccessedLinks():Promise<AcessType>{
        const withRegister =  await this.repository.countAccess(true)
        const withoutRegister = await this.repository.countAccess( false )
        return {no_register:withoutRegister.total_accessed_links , with_register:withRegister.total_accessed_links}
    }
    async selectLinks(vacancy_id:number):Promise<SelectLink[]>{
        return await this.repository.selectLinks(vacancy_id)
    }
}