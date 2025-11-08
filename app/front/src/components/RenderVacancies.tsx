import type { GetResumes } from "../types/index.types"

type Props = {
    vacanciesDatas:GetResumes[]
}
export const RenderVacanciesInfo = ({vacanciesDatas}:Props)=>{
    return vacanciesDatas.map((val) => (
    <div key={val.id} >
        <div>ID: {val.id}</div>
        <div>Vaga: {val.link_vacancy}</div>
        <div>Descrição: {val.description}</div>
        <div>Currículo usado: {val.resume_used}</div>
        <div>Nível da vaga: {val.vacancy_level}</div>
        <div>Status: {val.status}</div>
        <div>Candidatado em: {val.created_at}</div>
        <div>Link encurtado: {val.new_link}</div>
        <div>Link original: {val.original_link}</div>
        <div>Total de acessos: {val.total_accesses}</div>
        <div>Plataforma: {val.plataform}</div>
    </div>
    ))
}