import { Database } from "../database/db";
import {Service} from '../service/index'
import { Repository } from "../repository";
import { vacancies,linksMock } from "./db/fixtures";
import { cleanAcessLinks, cleanVacancies, mockLinks, mockVacancies } from "./db";

const db = new Database()
const rep = new Repository(db)
const service = new Service(rep)

const [vacancy] = vacancies
describe("service selectLinks",()=>{
    beforeEach(async()=>{
        await cleanAcessLinks()
        await cleanVacancies()

        await mockVacancies()
        await mockLinks( )
    })
    it("should select all the link from the correclyt vacancy id",async()=>{
        const values = await service.selectLinks(vacancy.id)
 
        expect( values ).toHaveLength( linksMock.filter((val)=>val.vacancy_id === vacancy.id).length )
    })
})