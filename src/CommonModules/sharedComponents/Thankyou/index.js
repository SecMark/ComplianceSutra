import React from 'react'
import "./style.css"
import background from "../../../assets/Images/backimage.png";
import check from "../../../assets/ERIcons/check.png"
import { useHistory } from 'react-router';


 function Thankyou() {

    const history = useHistory()

        setTimeout(() => {
        history.push('/settings')
        }, 3000)


    return (
        <div className="backimg" style={{ backgroundImage: `url(${background})`}}>
       
            <div className="checkicon">
                <img src={check} alt="check"/>
            </div>

                <span class="Signup">
                    Your payment for expert review service is successful!
                </span>

            <div>
                <span class="Taking-you-to-the-accounts-page">
                    Taking you to the accounts page..
                </span>
            </div>
        </div>     
    )
}

export default Thankyou
