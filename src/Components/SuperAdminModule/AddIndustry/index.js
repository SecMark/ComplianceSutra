import React,{useState} from 'react'
import Drawer from "../../../CommonModules/sharedComponents/Drawer";
import ADDIndustryDetail from "./AddIndustryType";
function SubTask() {
    const [isopen,setIsOpen] =useState(false);
    const OnClickDrawerChnage = (e) => {
        setIsOpen(!isopen);
    }
    return (
        <div>
            <button onClick={()=>setIsOpen(!isopen)}>
                Add Sub Task
            </button>
            <Drawer children={<ADDIndustryDetail/>} isOpen={isopen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default SubTask
