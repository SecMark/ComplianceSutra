import React,{useState} from 'react'
import Drawer from "../../../CommonModules/sharedComponents/Drawer";
import ADDSubTAskDetails from "./AddSubTask";
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
            <Drawer children={<ADDSubTAskDetails/>} isOpen={isopen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default SubTask
