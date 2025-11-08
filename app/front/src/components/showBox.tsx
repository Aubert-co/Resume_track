import { useState ,type ReactNode} from "react"

import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
export const BoxActions = styled.div`
  background-color: #ffffff;
  padding: 2rem 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  max-width: 700px;
  width: 90%;
  max-height: 80%;
  overflow-y: auto;

  /* Tipografia */
  font-family: "Inter", sans-serif;
  font-size: 0.95rem;
  color: #333;

  /* Divs internas */
  div {
    margin-bottom: 0.75rem;
    line-height: 1.5;
  }

  /* Botão de fechar */
  button {
    display: inline-block;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    background-color: #1976d2;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #125ea3;
    }
  }

  /* Scrollbar customizada */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(100, 100, 100, 0.4);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

type PropsBox ={
    children:ReactNode
}

export const useShowBox = ()=>{
   
    const [showBox,setShowBox] = useState(false)

    const Box =({children}:PropsBox)=>{
        return (
            <ModalOverlay>
            <BoxActions>
                <button onClick={()=>setShowBox(false)}> x</button>
                {children}
            </BoxActions>
            </ModalOverlay>
        )
    }
    return {Box,setShowBox,showBox}
}
