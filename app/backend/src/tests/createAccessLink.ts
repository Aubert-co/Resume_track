import {Repository} from '../repository/index'
import {Database} from '../database/db'
import { vacancies } from './db/fixtures'
import {Service} from '../service/index'
import { cleanAcessLinks, cleanVacancies ,mockVacancies} from './db'
import * as mockDatabase from '../database/db'
import { SelectLink } from '../types/database.types'
import { decodeId, getLastsLetter } from '../constants/decodeUrl'

const db = new Database()
const rep = new Repository(db)
const service = new Service(rep)
const [vacancy] = vacancies
const original_link = "https/lorem/iptsu"
const link_label = "linkedin"
describe("Service create acess link",()=>{
    beforeEach(async()=>{
        await cleanAcessLinks()
        await cleanVacancies()
        await mockVacancies() 
    })
    it("should create a new access link",async()=>{
    
         await service.createAcessLink({
            vacancy_id:vacancy.id,
            link_label,
            original_link
        })
        const values = await db.query(`SELECT * FROM links WHERE vacancy_id='${vacancy.id}'`) 
        const rows = values.rows[0] as  SelectLink

        expect( rows.original_link).toEqual( original_link)
        expect( decodeId(rows.code).hash).toBe( vacancy.id.toString() )
        expect( decodeId(rows.code).lastLetter).toBe( link_label.slice(0,1))
        expect( values.rows).toHaveLength(1)
    })
    it("should throw an error when already exists the same code",async()=>{
         await service.createAcessLink({
            vacancy_id:vacancy.id,
            link_label,
            original_link
        })

        await expect( service.createAcessLink({
            vacancy_id:vacancy.id,
            link_label,
            original_link
        })).rejects 
            .toThrow("Failed to create access link");
        const values = await db.query(`SELECT * FROM links WHERE vacancy_id='${vacancy.id}'`) 
       
 
        expect( values.rows ).toHaveLength(1)
    })
})