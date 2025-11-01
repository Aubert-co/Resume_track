import { IRepository } from "repository";
import { IncreaseAcess } from "types";
import { SelectLink } from "types/database.types";

export class Service{
    constructor(protected repository:IRepository){}

    async getLink(code:string):Promise<SelectLink[]>{
        return await this.repository.selectLink(code)
    }
    async increaseVacancy({vacancy_id,source}:IncreaseAcess):Promise<void>{
        await this.repository.increaseAcessedLink({vacancy_id,source})
    }
}