import { Database } from "../../database/db"
import {vacancies,accessedLinks, linksMock} from './fixtures'
const db = new Database()

export const cleanVacancies = async()=>{
    await db.query('DELETE  FROM vacancies WHERE id >0')
}
export const cleanAcessLinks = async()=>{
    await db.query('DELETE  FROM links WHERE id >0')
}
export const cleanAccessedLinks = async()=>{
  await db.query('DELETE FROM accessed_links WHERE id >0')
}

export const mockVacancies = async () => {
  for (const v of vacancies) {
    await db.query(
      `INSERT INTO vacancies (id, link_vacancy, description, resume_used, vacancy_level, status, plataform) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (id) DO NOTHING`, 
      [v.id, v.link_vacancy, v.description, v.resume_used, v.vacancy_level, v.status, v.plataform]
    );
  }
};

export const mockAccessedLinks = async()=>{
  for(const v of accessedLinks){
    const sql = `INSERT INTO accessed_links(id,vacancy_id,accessed_at,source)
    VALUES($1,$2,$3,$4)`
    await db.query( sql,[v.id,v.vacancy_id,v.accessed_at,v.source] )
  }
}

export const mockLinks = async()=>{
  for(const v of linksMock){
    const sql = `INSERT INTO links(id,vacancy_id,link_label,original_link,code) VALUES($1,$2,$3,$4,$5)`
    await db.query(sql,[v.id,v.vacancy_id,v.link_label,v.original_link,v.code])
  }
}