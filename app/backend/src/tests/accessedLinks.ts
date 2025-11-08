import { cleanAccessedLinks, cleanVacancies, mockAccessedLinks, mockVacancies } from "./db"
import { Database } from "../database/db"
import { Repository } from "../repository"
import { Service } from "../service"
import { accessedLinks } from "./db/fixtures"

const db = new Database()
const rep = new Repository(db)
const service = new Service(rep)
describe('acessed links',()=>{
    beforeEach(async()=>{
        await cleanAccessedLinks()
        await cleanVacancies()

        await mockVacancies()
        await mockAccessedLinks()
    })
    it("should return acessed links correclyt",async()=>{
        const values =  await service.countAccessedLinks()
        expect( Number(values.no_register) ).toBe( accessedLinks.filter((val)=>val.vacancy_id !==null).length )
        expect( Number(values.with_register) ).toBe(accessedLinks.filter((val)=>val.vacancy_id === null).length)
        
    }) 
})