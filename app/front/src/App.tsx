import  { useEffect, useState } from "react"
import { getResumes } from "./services/index.services"
import { usableFetch } from "./services/fetchs"
import type { GetResumes } from "./types/index.types"
import { BaseTable } from "./components/baseTable"
import { Tbody,Thead } from "./components/tableVacancies"
import { useShowBox } from "./components/showBox"
import { RenderVacanciesInfo } from "./components/RenderVacancies"
import { useRenderLinks } from "./components/renderLinksInfos"


type State = {
  status:number,
  message?:string,
  datas?:GetResumes[]
}


type StateBox ={
  datas:GetResumes[]
}

function App(){
    const [resumes,setDatas] = useState<State>({
        status:0,message:'',datas:[]
    })
    const [vacanciesDatas,setVacancies] = useState<StateBox>({datas:[] })
    
    const {showBox,Box,setShowBox} = useShowBox()
    const {showBox:showLinks,Box:BoxLinks,setShowBox:setShowLinks} = useShowBox()
    const {RenderLinkInfos,setVacancyId} = useRenderLinks()
    useEffect(()=>{
        usableFetch({
            setDatas,
            service:getResumes
        })
    },[])
    return (
        <div >
            {showBox && 
                <Box>
                   <RenderVacanciesInfo vacanciesDatas={vacanciesDatas.datas}/>
                </Box>
            }
            {
              showLinks &&
              <BoxLinks>
                  <RenderLinkInfos/>
              </BoxLinks>
            }
           <BaseTable tbody={   
            <Tbody 
                datas={resumes.datas}
                setShowBox={setShowBox}
                setDatasBox={setVacancies}
                setShowLinks={setShowLinks}
                setVacancyId={setVacancyId}
                />
            } 
                thead={<Thead/>}/>
        </div>

    )
}

export default App