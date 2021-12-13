import React from 'react'
import IconButton from '../../components/Buttons/IconButton';
import { Input } from '../../components/Inputs/Input';
import Text from "../../components/Text/Text";
import templateListInfo from '../../constants/TemplateListData';
import renderTemplateList from '../../components/TemplateListTable';
import styles from "./style.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";

function AuditTemplateList() {
    return (
        <>     
            <Text heading="h1" text="Audit Templates" variant="templateMainHeading"/>
               <div className={styles.box}> 
                    <div className={styles.inputForSearchTemplate}>
                        <Input placeholder="Search for Task" variant="inputForSearchTask"/> 
                    </div>
                    <div className={styles.searchIcon}>

                        <IconButton  icon={<AiOutlineSearch/>} variant="auditTemplateSearchIconButton"/>
                    </div>
                </div>
                    <div className={styles.horizontalLine}>
                
                        <div className={styles.horizontalDarkLine}>
                    
                        </div>
                    </div>
                <div className={styles.createTemplate}>
                    <IconButton icon={<AiFillPlusSquare />}  variant="auditTemplatePlusIconButton"/>
                </div>
            <Text heading="h6" text="Create New Templates" variant="createNewTemplate"/> 
            <Text heading="h6" text="Sort By" variant="sortBy"/> 
                <div className={styles.backgroundColorName}>
                     <Text heading="h6" text="Names" variant="name"/> 
                </div>
            <Text heading="h6" text="Created By" variant="createdBy"/> 
            <Text heading="h6" text="Audit Type" variant="auditType"/> 
                
                <table>
                            <thead>
                                <tr>
                                    <th>TEMPLATE NAME</th>
                                    <th>%COMPLETION</th> 
                                    <th>MADE BY</th>
                                    <th>AUDIT TYPE</th>
                                    <th>REQUIRED DATA POINTS</th>
                                    <th>CHECKPOINTS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {templateListInfo.map(renderTemplateList)}
                            </tbody>         
                </table>
        </>
    )
}
export default AuditTemplateList
