import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import IconButton from '../../components/Buttons/IconButton';
import styles from "./style.module.scss";

const renderTemplateList=(templateListInfo,index)=>
{
    return(
        <tr key={index}>
            <td>{templateListInfo.templateName}</td>
            <td className={index===0? styles.completedRed:styles.completedGreen}>{templateListInfo.complition}</td>
            <td>{templateListInfo.madeby}</td>
            <td>{templateListInfo.auditType}</td>
            <td>{templateListInfo.requiredDataPoints}</td>
            <td>{templateListInfo.checkpoints}</td>
            <td><IconButton icon={<AiOutlineEdit/>} variant="editIcon"/></td>
            <td className={styles.templateStatus}>{templateListInfo.templateStatus}</td>
            <td className={styles.auditStatus}>{templateListInfo.aditStatus}</td>
            <td><IconButton icon={<AiOutlineRight/>} variant="rightIcon"/> </td>
        </tr>
    )
}

export default renderTemplateList;