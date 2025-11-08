import { Database } from "../database/db";
import {Service} from '../service/index'
import { Repository } from "../repository";
import { vacancies,linksMock } from "./db/fixtures";
import { cleanAccessedLinks, cleanAcessLinks, cleanVacancies, mockAccessedLinks, mockLinks, mockVacancies } from "./db";

const db = new Database()
const rep = new Repository(db)
const service = new Service(rep)

const [vacancy] = vacancies
describe("service selectLinks",()=>{
    beforeEach(async()=>{
        await cleanAcessLinks()
        await cleanAccessedLinks()
        await cleanVacancies()

        await mockVacancies()
        await mockLinks( )
        await mockAccessedLinks()
    })
      afterAll(async()=>{
        await cleanAcessLinks()
        await cleanAccessedLinks()
        await cleanVacancies()

        await mockVacancies()
        await mockLinks( )
        await mockAccessedLinks()
    })
    it("should select all the link from the correclyt vacancy id",async()=>{
        const values = await service.selectVacancies()

        expect( values ).toHaveLength( vacancies.length)     
    })
})