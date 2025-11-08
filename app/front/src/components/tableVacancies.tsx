import type { GetResumes } from "../types/index.types";
import { getDaysAgo } from "../utils";

type PropsTbody = {
    datas?:GetResumes[],
    setShowBox: React.Dispatch<React.SetStateAction<boolean>>;
    setDatasBox:React.Dispatch<React.SetStateAction<{datas:GetResumes[]}>>
    setShowLinks:React.Dispatch<React.SetStateAction<boolean>>,
    setVacancyId:React.Dispatch<React.SetStateAction<{id:number}>>
}
export const Thead = () => {
  const values = ["Ações","Vaga", "Candidatado", "Portfólio","Acessos"
    ,"Status","Plataforma"];
  return values.map((val, ind) => <th key={ind}>{val}</th>);
};


export const Tbody = ({datas,setShowBox,setDatasBox,setShowLinks,setVacancyId}:PropsTbody)=>{
    if(!datas || datas.length === 0)return <></>;
    const onclick = (datas:GetResumes)=>{
        setDatasBox({datas:[datas]})
        setShowBox(true)
    }
    const openLinks = (id:number)=>{
        setShowLinks(true)
        setVacancyId({id})
    }
    return datas.map((v)=>{
        return (<tr key={v.id}>
            <td data-label="Ações">
                <button onClick={()=>onclick(v)}>ver</button>
                <button onClick={()=>openLinks(v.id)}>Links</button>
            </td>
            <td data-label="Vaga">{v.link_vacancy}</td>
            <td data-label="Candidatado a">{getDaysAgo(v.created_at)} dias</td>
            <td data-label="link de portifolio">{v.new_link}</td>
            <td data-label="acessou o portifolio">{v.total_accesses}</td>
            <td data-label="status">{v.status}</td>
            <td data-label="Plataforma">{v.plataform}</td>
        </tr>)
    })
}
