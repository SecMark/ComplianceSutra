import React ,{useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function PasswodEye() {
 
    const [visible, setVisibility] = useState(false);

    const Ico =(
         <FontAwesomeIcon icon={  visible ? "eye-slash" : "eye" }
         onClick={() => setVisibility(visiblity => !visiblity)}
         
         />
    )

    const Input = visible ? "text" : "password";

    return[Input,Ico];
}

export default PasswodEye