import { useEffect, useState } from "react"
import { usableFetch } from "../services/fetchs"
import {  getLinkByVacancyId ,type BodyGetLink} from "../services/index.services"
import type { Links } from "../types/index.types"
import styled from "styled-components"
import { FormAddLink } from "./formAddLink"
const LinksContainer = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
`;

const LinkCard = styled.div`
  background-color: rgb(14, 20, 32);
  color: #fff;
  padding: 1rem;
  border-radius: 16px;
  border: 1px solid #2a2f3a;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
  }

  p {
    margin: 0.25rem 0;
    color: #ccc;

    span {
      color: #8ea0c0;
      font-weight: 500;
    }

    a {
      color: #4da6ff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .label {
    color: #4da6ff;
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.4rem;
  }
`;



type State = {
    datas?:Links[],
    status:number,
    message?:string
}
type StateVacancy = {
    id:number
}


export const useRenderLinks = ()=>{
    const [vacancyId,setVacancyId] = useState<StateVacancy>({id:0})
    
    const RenderLinkInfos = ()=>{

        const [links,setDatas] = useState<State>({datas:[],status:0,message:''})
        useEffect(()=>{
            usableFetch<Links[],BodyGetLink>({
                setDatas,
                service:getLinkByVacancyId,
                body:{id:vacancyId.id}
            })
        },[vacancyId.id])
        if(!links.datas)return;
        return (
            <LinksContainer>
            {
            links.datas.map((val)=>{
                    return (
                        <LinkCard>
                            <p>Label: {val.link_label}</p>
                            <p>Plataforma: {val.plataform}</p>
                            <p>Link novo: {val.new_link}</p>
                            <p>codigo: {val.code}</p>
                        </LinkCard>
                    )
                })}
                <FormAddLink vacancy_id={vacancyId.id}/>
                </LinksContainer>
            )
    
    }
    return {setVacancyId,RenderLinkInfos}
}