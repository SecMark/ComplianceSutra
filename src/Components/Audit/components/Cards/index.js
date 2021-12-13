import React from 'react'
import styles from "./style.module.scss";
import Button from '../../components/Buttons/Button';
import IconButton from '../../components/Buttons/IconButton';
import {AiOutlineArrowRight} from "react-icons/ai"

function Cards({item,index}) {
    return (
        <div className={styles.wrap}>
              <div className={styles.auditCard}>
                    <div className={styles.title}>
                            {item.title} 
                        <div className={styles.text}>
                            {item.text} 
                         </div>
                         {index===0 ? <Button description="BUILD NOW" variant="auditButton" />: <IconButton icon={<AiOutlineArrowRight/ >} variant="auditIconButton"/>}
                     </div>  
                </div>
        </div>
    )
}
export default Cards
