import React, { useState } from "react";
import Modal from 'react-awesome-modal';
import "./style.css";
import { withRouter } from 'react-router-dom'
import modelClose from "../../assets/Images/teammember/modelCloseIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { actions as signActions } from "./redux/actions"
import teammember from "../../assets/Images/teammember.jpeg"

function SignUpPopup({ history }) {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(true)

    const location = window.location.href.split('=');
    let companyName = location[location.length - 1];
    let email = location[1].split('&')[0];
    const urlParams = new URLSearchParams(window.location.search);
    // const email = urlParams.get('email');
    // const companyName = urlParams.get('companyName')
    let teamMember = {
        email: email,
        companyName: companyName,
    }
    dispatch(signActions.storeTeamMemberData({ teamMemberInfo: teamMember }))
    const payload = {
        loginID: email,
        pwd: "",
        rememberme: 0,
        loginty: "AdminEmail",
        history:history
    }
    dispatch(signActions.createActionForMailCheckRequest(payload))

    const onSignUpClick = () => {
        history.push("/personal-details-team-member");



    }


    const obj = {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        webkitBackdropFilter: 'blur(9px)',
        backdropFilter: 'blur(9px)',
        backgroundColor: '#1b1d21',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '10000',
        backgroundImage: `url(${teammember})`,
        backgroundPosition: '100 % 100 %',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        opacity: '0.9'
    }
    return (
        <div style={obj} className="">
            <Modal visible={visible} width="425" height="254" effect="" onClickAway={() => { return "" }}>
                <div className="model-design">
                    <img className="close-icon" src={modelClose} alt="model Close" />
                    <h1>Signup to view task details</h1>
                    <div className="normal-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</div>
                    <div className="lastBtn text-center">
                        <button onClick={() => onSignUpClick()} className="btn signUpNow">signup now</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default withRouter(SignUpPopup)
