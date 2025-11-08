import { useRef } from "react"
import { generateLink } from "../services/index.services"
import styled from "styled-components";
type PropsForm = {
    vacancy_id:number
}

const AddLinkBox = styled.div`
  background: #0e1420;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 450px;
  margin: 2rem auto;
  color: #fff;

  label {
    font-size: 0.9rem;
    color: #c5c5c5;
    margin-bottom: 0.2rem;
  }

  input {
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid #2c3345;
    background-color: #1a2235;
    color: #fff;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #3b82f6; /* azul suave */
    }
  }

  button {
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #2563eb;
    }
  }
`;
export const FormAddLink =({vacancy_id}:PropsForm)=>{
    const link_label = useRef<HTMLInputElement>(null)
    const original_link = useRef<HTMLInputElement>(null)
    const onClick = async()=>{
        const label = link_label.current?.value
        const original = original_link.current?.value
        if(!label)return;
        if(!original)return;
        await generateLink({
            vacancy_id,
            link_label:label,
            original_link:original
        })
    }
    return(
       <AddLinkBox>
        <div>
            <label htmlFor="label">Label:</label>
            <input id="label" type="text" ref={link_label} placeholder="Ex: GitHub" />
        </div>

        <div>
            <label htmlFor="link">Link Original:</label>
            <input id="link" type="url" ref={original_link} placeholder="https://..." />
        </div>

        <button onClick={onClick}>Criar</button>
        </AddLinkBox>

    )
}