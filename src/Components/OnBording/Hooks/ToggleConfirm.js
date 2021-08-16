import React ,{useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ToggleConfirm() {
   
    const [visible, setVisibility] = useState(false);

    const Iconic =(
         <FontAwesomeIcon icon={  visible ? "eye-slash" : "eye" }
         onClick={() => setVisibility(visiblity => !visiblity)}
         
         />
    )

    const InputTypee = visible ? "text" : "password";

    return[InputTypee,Iconic];
}

export default ToggleConfirm