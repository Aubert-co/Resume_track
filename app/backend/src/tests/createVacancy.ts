import {Repository} from '../repository/index'
import {Database} from '../database/db'
import {Vacancies,CreateVacancyDTO} from '../types/index'
import {Service} from '../service/index'
import { cleanVacancies } from './db'
import * as mockDatabase from '../database/db'
const db = new Database()
const rep = new Repository(db)
const service = new Service(rep)
const vacancyData:CreateVacancyDTO = {
  linkVacancy: "lorem itpsu",
  description: "description",
  resume_used: "resume_used",
  vacancy_level: "lelvel",
  status: "hight",
  plataform: "linkedin"
};

describe('Service createVacancy',()=>{
    beforeEach(async()=>{
        await cleanVacancies()
        jest.clearAllMocks()
    })
    it("should create a new vacancy",async()=>{
        try{
            await service.createVacancy(vacancyData)
            const values = await db.query('SELECT * FROM vacancies') 
            const rows = values.rows[0]  as Vacancies
            expect( rows.description ).toEqual(vacancyData.description)
            expect( rows.resume_used ).toBe( vacancyData.resume_used )
            expect( rows.link_vacancy).toBe(vacancyData.linkVacancy)
            expect( rows.plataform).toBe(vacancyData.plataform)
            expect( rows.status).toBe( vacancyData.status)
            expect( rows.vacancy_level).toBe(vacancyData.vacancy_level)
            expect( values.rows ).toHaveLength(1)
        }catch(err){
            console.log( err)
        }
    })
    it("should not create a new vacancy when an error occurs id the dabase",async()=>{
        
            const mock =new  mockDatabase.Database()
            jest.spyOn(mock, 'query').mockRejectedValue(new Error("DB error"));
            const repository = new Repository(mock)
            const service = new Service(repository)
            await expect(service.createVacancy(vacancyData))
            .rejects
            .toThrow("Failed to create a vacancy");
            const values = await db.query('SELECT * FROM vacancies') 
            const rows = values.rows

            expect( rows).toHaveLength(0)
        
    })
})