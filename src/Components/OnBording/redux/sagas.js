import { call, put, takeLatest, delay, select } from "redux-saga/effects";
import { actions, types } from "./actions";
import api from "../api";
import apiServices from "../../../apiServices";

import { toast } from "react-toastify";
let temp = [];
const complianceOfficer = (state) => state && state.complianceOfficer;

const verifyEmailReq = function* verifyEmailReq({ payload }) {
  try {
    let obj = {
      email: payload.email,
    };
    toast.success("Please Wait!!");
    const { data } = yield call(api.verifyEmail, obj);

    if (data.message.status !== false) {
      yield put(actions.setLoader(false));
      toast.success(
        "The verification link has been sent to your email account successfully"
      );
    } else {
      yield put(actions.setLoader(false));
      toast.error(data.message.status_response);
    }
  } catch (err) {
    yield put(actions.setLoader(false));
  }
};

const taskMailRequest = function* taskMailRequest({ payload }) {
  const body = `<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Verify your email to finish registration</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,800;1,900&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    </head>
    <body style="max-width: 680px; width: 680px; font-family: Poppins,Arial; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="background-color: #f6f8fb; width: 100%; border: 1px solid #e0e0e0; border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
            <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; margin: 0 auto !important; max-width: 680px; width: 680px;">
                    <div
                        style="
                            box-sizing: border-box;
                            display: block;
                            margin: 0 auto;
                            max-width: 680px;
                            padding: 10px;
                            height: 920px;
                            background-repeat: no-repeat;
                            background-position: center;
                            background-size: 100% 100%;
                            background-image: url(https://lh3.googleusercontent.com/-33hJPtKGhr8/YFR34n4Nb2I/AAAAAAAAGQs/xz2UYfIOitAMHzQlnopabZhvTPFK26rpQCK8BGAsYHg/s0/2021-03-19.png?authuser=0);
                        "
                    >
                        <table role="presentation" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-radius: 3px; width: 100%;">
                            <tr>
                                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 0 70px;">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                        <tr>
                                            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td height="30" style="font-family: sans-serif; font-size: 14px; vertical-align: top;"></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                                                                <img
                                                                                    src="https://lh3.googleusercontent.com/-t14EexU88xI/YFSArvaxRHI/AAAAAAAAGQ4/8eq5Cwo5E3YZiFZFsv7MfFU0DRBPvAtVACK8BGAsYHg/s0/2021-03-19.png?authuser=0"
                                                                                    alt="COMPLIANCE SUTRA" title="COMPLIANCE SUTRA"
                                                                                    style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%;"
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td height="30" style="font-family: sans-serif; font-size: 14px; vertical-align: top;"></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table
                                                    role="presentation"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    class="inside-box"
                                                    style="
                                                        border-collapse: separate;
                                                        mso-table-lspace: 0pt;
                                                        mso-table-rspace: 0pt;
                                                        width: 100%;
                                                        background-image: url(https://lh3.googleusercontent.com/-DlkPGODxAhg/YFSCugUo5hI/AAAAAAAAGRE/4WnteA2j-qo6Kd0UTgRZKin026fvst4lQCK8BGAsYHg/s0/2021-03-19.png?authuser=0);
                                                        width: 100%;
                                                        height: 271px;
                                                        background: -webkit-linear-gradient(left, #60bcfd, #b843f2);
                                                        background: -moz-linear-gradient(left, #60bcfd, #b843f2);
                                                        background: linear-gradient(to right, #60bcfd, #b843f2);
                                                        background-repeat: no-repeat;
                                                        background-position: center;
                                                        background-size: 100% 100%;
                                                        border-radius: 5px;
                                                    "
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td height="40" style="font-family: sans-serif; font-size: 14px; vertical-align: top;"></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                                                                <p
                                                                                    style="
                                                                                        font-family: Poppins , Arial;
                                                                                        font-size: 32px;
                                                                                        font-weight: bold;
                                                                                        font-stretch: normal;
                                                                                        font-style: normal;
                                                                                        line-height: 1.38;
                                                                                        letter-spacing: normal;
                                                                                        text-align: center;
                                                                                        color: #ffffff;
                                                                                        margin: 0;
                                                                                        margin-bottom: 15px;
                                                                                    "
                                                                                >
                                                                                    Verify your email to <br />
                                                                                    finish registration
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td height="30" style="font-family: sans-serif; font-size: 14px; vertical-align: top;"></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                                                                <p
                                                                                    style="
                                                                                        opacity: 0.68;
                                                                                        font-family: Poppins , Arial;
                                                                                        font-size: 14px;
                                                                                        font-weight: 300;
                                                                                        font-stretch: normal;
                                                                                        font-style: normal;
                                                                                        line-height: 1.43;
                                                                                        letter-spacing: normal;
                                                                                        text-align: center;
                                                                                        color: #ffffff;
                                                                                        padding: 0px 25px;
                                                                                        margin: 0;
                                                                                        margin-bottom: 15px;
                                                                                    "
                                                                                >
                                                                                    Please confirm that<a href="#" style="color: #ffffff; text-decoration: none;"> ${payload.email} </a>is your <br />
                                                                                    email address by clicking on the button below
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td height="30" style="font-family: sans-serif; font-size: 14px; vertical-align: top;"></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top;"></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table
                                                    role="presentation"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    style="
                                                        background: white;
                                                        border-bottom: 4px solid #bd51f6;
                                                        border-bottom-left-radius: 6px;
                                                        border-bottom-right-radius: 6px;
                                                        padding: 0 35px;
                                                        width: 100%;
                                                        border-collapse: separate;
                                                        mso-table-lspace: 0pt;
                                                        mso-table-rspace: 0pt;
                                                        width: 100%;
                                                    "
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                                                <table
                                                                    role="presentation"
                                                                    border="0"
                                                                    cellpadding="0"
                                                                    cellspacing="0"
                                                                    style="width: 100%; border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td height="20" style="font-family: sans-serif; font-size: 14px; vertical-align: top;"></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="left" style="width: 50%; font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                                                                <p
                                                                                    style="
                                                                                        font-family: Poppins , Arial;
                                                                                        font-size: 10px;
                                                                                        font-weight: normal;
                                                                                        font-stretch: normal;
                                                                                        font-style: normal;
                                                                                        line-height: normal;
                                                                                        letter-spacing: 0.02px;
                                                                                        text-align: left;
                                                                                        color: #1b1d21;
                                                                                        margin-bottom: 0px;
                                                                                        margin: 0;
                                                                                        margin-bottom: 15px;
                                                                                    "
                                                                                >
                                                                                    TASK NAME
                                                                                </p>
                                                                            </td>
                                                                            <td align="right" style="width: 50%; text-align: right; font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                                                                <p
                                                                                    style="
                                                                                        text-align: right;
                                                                                        font-family: Poppins , Arial;
                                                                                        font-size: 10px;
                                                                                        font-weight: normal;
                                                                                        font-stretch: normal;
                                                                                        font-style: normal;
                                                                                        line-height: normal;
                                                                                        letter-spacing: 0.02px;
                                                                                        text-align: right;
                                                                                        color: #1b1d21;
                                                                                        margin-bottom: 0px;
                                                                                        margin: 0;
                                                                                        margin-bottom: 15px;
                                                                                    "
                                                                                >
                                                                                    DUE DATE
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td height="10" style="border-bottom: 1px solid #e4e4e4; font-family: sans-serif; font-size: 14px; vertical-align: top;"></td>
                                                                            <td height="10" style="border-bottom: 1px solid #e4e4e4; font-family: sans-serif; font-size: 14px; vertical-align: top;"></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td height="10" style="font-family: sans-serif; font-size: 14px; vertical-align: top;"></td>
                                                                            <td height="10" style="font-family: sans-serif; font-size: 14px; vertical-align: top;"></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="left" style="width: 50%; font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                                                                <p
                                                                                    style="
                                                                                        font-family: Poppins , Arial;
                                                                                        font-size: 15px;
                                                                                        font-weight: normal;
                                                                                        font-stretch: normal;
                                                                                        font-style: normal;
                                                                                        line-height: normal;
                                                                                        letter-spacing: 0.01px;
                                                                                        text-align: left;
                                                                                        color: #1b1d21;
                                                                                        margin: 0;
                                                                                        margin-bottom: 15px;
                                                                                    "
                                                                                >
                                                                                    ${payload.item.taskListName}
                                                                                </p>
                                                                            </td>
                                                                            <td
                                                                                align="right"
                                                                                style="
                                                                                    text-align: right;
                                                                                    width: 50%;
                                                                                    font-family: sans-serif;
                                                                                    font-size: 14px;
                                                                                    vertical-align: top;
                                                                                    font-family: Poppins , Arial;
                                                                                    font-size: 12px;
                                                                                    font-weight: normal;
                                                                                    font-stretch: normal;
                                                                                    font-style: normal;
                                                                                    line-height: normal;
                                                                                    letter-spacing: 0px;
                                                                                    text-align: right;
                                                                                    color: #1b1d21;
                                                                                "
                                                                            >
                                                                                <p style="text-align: right; font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">${payload.date}</p>
                                                                            </td>
                                                                        </tr>
                                                                        
                                                                        
                                                                        <tr>
                                                                            <td height="10" style="width: 50%; font-family: sans-serif; font-size: 14px; vertical-align: top;"></td>
                                                                            <td height="10" style="width: 50%; font-family: sans-serif; font-size: 14px; vertical-align: top;"></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="center" colspan="2" style="width: 50%; font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                                                                <a
                                                                                target="_blank"
                                                                                href=${payload.link}
                                                                                    type="button"
                                                                                    style="
                                                                                        border-radius: 4px;
                                                                                        background-color: #6c5dd3;
                                                                                        font-family: Poppins , Arial;
                                                                                        font-size: 12px;
                                                                                         text-decoration:none;                                                                                font-weight: 600;
                                                                                        font-stretch: normal;
                                                                                        font-style: normal;
                                                                                        line-height: 1.43;
                                                                                        letter-spacing: normal;
                                                                                        text-align: center;
                                                                                        color: #fff;
                                                                                        outline: none;
                                                                                        border: none;
                                                                                        height: 44px;
                                                                                        cursor: pointer;
                                                                                        padding: 10px 15px;
                                                                                    "
                                                                                >
                                                                                    ACCEPT INVITATION
                                                                                </a>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td height="25" style="width: 50%; font-family: sans-serif; font-size: 14px; vertical-align: top;"></td>
                                                                            <td height="25" style="width: 50%; font-family: sans-serif; font-size: 14px; vertical-align: top;"></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center">
                                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td height="20"></td>
                                                                        </tr>
                                                                        <tr>
                                                                            
                                                                            <td
                                                                                align="center"
                                                                                style="
                                                                                    font-family: Poppins , Arial;
                                                                                    font-size: 12px;
                                                                                    font-weight: normal;
                                                                                    font-stretch: normal;
                                                                                    font-style: normal;
                                                                                    line-height: 1.5;
                                                                                    letter-spacing: normal;
                                                                                    text-align: center;
                                                                                    color: #9a9ea2;
                                                                                "
                                                                            >
                                                                                <a https://www.google.com/url?q=https://drive.google.com/file/d/1eV8wzPYFN4s9KxTA2oQCoQjEM2s8vDU-/view&sa=D&source=hangouts&ust=1621405012282000&usg=AFQjCNEnO5aGXqg2srJnDZqxcuxzwbKQVg" target="_blank" style="color: #9a9ea2; text-decoration: none;">Terms & Conditions</a>
                                                                            </td>
                                                                            <td
                                                                                align="center"
                                                                                style="
                                                                                    font-family: Poppins , Arial;
                                                                                    font-size: 12px;
                                                                                    font-weight: normal;
                                                                                    font-stretch: normal;
                                                                                    font-style: normal;
                                                                                    line-height: 1.5;
                                                                                    letter-spacing: normal;
                                                                                    text-align: center;
                                                                                    color: #9a9ea2;
                                                                                "
                                                                            >
                                                                                <a href="https://www.secmark.in/privacy-policy" target="_blank" style="color: #9a9ea2; text-decoration: none;">Privacy Policy</a>.
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td height="20"></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center">
                                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td height="20"></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="center">
                                                                                <div style="background: #1fd2fd; height: 3px; width: 50px;"></div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td height="20"></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center">
                                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="center" style="text-align: center;">
                                                                                <img
                                                                                    src="https://lh3.googleusercontent.com/-zg-sjNz0kCQ/YFXkrZ5cv3I/AAAAAAAAGSc/Wx216Lr5nUo52eb_6BBJmsK31x3ve6m1ACK8BGAsYHg/s0/2021-03-20.png?authuser=0"
                                                                                     alt="COMPLIANCE SUTRA" title="COMPLIANCE SUTRA"
                                                                                    style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%;"
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td
                                                                                align="center"
                                                                                style="
                                                                                    padding-bottom: 10px;
                                                                                    padding-top: 10px;
                                                                                    opacity: 0.63;
                                                                                    font-family: Poppins , Arial;
                                                                                    font-size: 10px;
                                                                                    font-weight: 300;
                                                                                    font-stretch: normal;
                                                                                    font-style: normal;
                                                                                    line-height: 1.6;
                                                                                    letter-spacing: normal;
                                                                                    text-align: center;
                                                                                    color: #9a9a9a;
                                                                                "
                                                                            >
                                                                                © 2021 CAPMTech. All rights reserved.
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td height="30"></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center">
                                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="center">
                                                                            <a href="#" style="color: #9a9ea2; text-decoration: none;">
                                                                            <img
                                                                                src="https://lh6.googleusercontent.com/Fr_NGw8_HYkPcd5V9BlMCYqLKK4z0oLtAcNlw0cC1vMNs7HdHA-r2WnvRk4eVD6UN-Ws5mbM9WSe1ugYG1O1fR2oVPekOPkq8c4HST40JKchFE98dKvA_QIkT97JsTcdTGbQwxBcWdaIv_PeWl77dyCkYxVd80eDoA2seXFDeIhLj86sdkCszA8MvIvvqznxBTKBEw=w28-h28"
                                                                                alt="Facebook" title="Facebook"
                                                                                style="width: 24px; height: 24px; object-fit: contain; opacity: 1;"
                                                                            />
                                                                        </a>

                                                                        <a href="#" style="color: #9a9ea2; text-decoration: none;">
                                                                            <img
                                                                                src="https://lh4.googleusercontent.com/aXCsfEFcX8XgN6CxJdLWvkiiE_jMfSID4KLLZAPuHcIr6tfOKGDwXB4fUegV6XV1QDWz_pQAQ_CjrhOk9fHY-mpYGKuIQAtR-Ryj1PzblYsNjYhI_1r5Wy2k5WVcgJbLIYaqF7WG23CrQn0hZjkZSfSE85cWCgCXmLJOs9XgOWJN4I3BE4MpvgVUc-9nGtlHSplbID8KwHiF0G8=w28-h28"
                                                                                alt="Instagram" title="Instagram"
                                                                                style="width: 24px; height: 24px; object-fit: contain; opacity: 1; padding: 0px 10px;"
                                                                            />
                                                                        </a>

                                                                        <a href="#" style="color: #9a9ea2; text-decoration: none;">
                                                                            <img
                                                                                src="https://lh3.googleusercontent.com/bYe3d4ITeQoe9Lj-Jf7nfSnwwnlKbA64pUP_jja4Q6Yh7pAeo2qsCupgGl6bDBfAcquWkljXn3Eurl0QMAjawsA6SLw76Xi2yDQ1kAWxhHfMbqusqWJWIen6ms1LzatGcsdIa9MssxxHFUjyE_GXDCEIV_zU8Hj83gcYFoq6iMYGklkGezmegj1MR3VxjaFovFH3292GRm5Acy5jr5nz=w28-h28"
                                                                                alt="Twitter" title="Twitter"
                                                                                style="padding-right: 10px; width: 24px; height: 24px; object-fit: contain; opacity: 1;"
                                                                            />
                                                                        </a>

                                                                        <a href="#" style="color: #9a9ea2; text-decoration: none;">
                                                                            <img
                                                                                src="https://lh4.googleusercontent.com/KHQ87o1GGgeQATRk8wIYPoyk-tU7Tc5LiLGR1eOCnx4jmWxgy74wo1cgG8RDByZatPTWchgAZcVkJewfABoHHZ0IMFBx_dVAU0CKWmbeN0GRFhPbkcf6Fvxgt-w7v-wPORLF8a2hgbQUBzPAJ3RmoXMOMHBGU_r670VOussSrRtw9VBwCjX0mT_8WWBsiOrOjLAKRtCvFznL-VlBacs4=w28-h28"
                                                                                alt="LinkedIn" title="LinkedIn"
                                                                                style="width: 24px; height: 24px; object-fit: contain; opacity: 1;"
                                                                            />
                                                                        </a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </body>
</html>`;

  try {
    window.Email.send({
      Host: "180.179.151.1",
      Username: "secmarktx@m3c.io",
      Password: "Am6#uIayAOE#c",
      To: payload.email,
      From: "support@capmtech.com",
      Subject: "Task List Mail",
      Body: body,
    })
      .then(function (message) {
        console.log("message", message);
        if (message === "OK") {
          toast.success("mail sent successfully");
        } else {
          toast.error("mail not sent successfully");
        }
        // toast.success("mail sent successfully")
      })
      .then(function (error) {
        console.log("error", error);
        // toast.error("mail not sent successfully")
      });
  } catch (err) {
    yield put(actions.createTaskMailRequestFailed({ verifyEmail: false }));
  }
};

const insertUpdateDeleteAPIReq = function* insertUpdateDeleteAPIReq({
  payload,
}) {
  try {
    localStorage.setItem("basicToken", "");
    const { data, status } = yield call(
      api.checkEmailVerifiedThroughEmail,
      payload
    );
    const { message } = data;
    if (message.status !== false) {
      const { token } = message;
      localStorage.setItem("basicToken", token);
      toast.success("Personal Information saved successfully");
      payload.history.push("/company-details");
    } else {
      toast.error(message.status_response);

      yield put(
        actions.insUpdateDeletAPIRequestFailed({ loginSuccess: false })
      );
    }
  } catch (err) {
    yield put(actions.insUpdateDeletAPIRequestFailed({ loginSuccess: false }));
  }
};

const companyTypeRequest = function* companyTypeRequest({ payload }) {
  try {
    const { data, status } = yield call(api.companyType, payload);

    if (data) {
      console.log(data);
      yield put(
        actions.companyTypeRequestSuccess({ companyLicenseData: data.message })
      );
      //yield put(push(`/${authData && authData.store_locale}/my-account`));
      toast.success(data && data.Message);
    } else {
      toast.success(data && data.Message);
      yield put(
        actions.companyTypeRequestFailed({
          companyType: false,
          companyLicenseData: [],
        })
      );
    }
  } catch (err) {
    // toast.error(
    //     (err && err.response && err.response.data && err.response.data.message) ||
    //         'Something went to wrong, Please try after sometime',
    // );
    yield put(
      actions.companyTypeRequestFailed({
        companyType: false,
        companyLicenseData: [],
      })
    );
  }
};

const getLicenseList = function* getLicenseList({ payload }) {
  try {
    const { data, status } = yield call(api.getLicenseList, payload);
    if (data) {
      yield put(
        actions.setLicenseList({
          licenseList: data.message.industry_license_list,
        })
      );
      toast.success(data && data.Message);
    } else {
    }
  } catch (err) {}
};

const otpRequest = function* otpRequest({ payload }) {
  try {
    const { data, status } = yield call(api.sendOTP, payload);
    if (status === 200) {
      yield put(actions.sendOTPRequestSuccess(data));
      //yield put(push(`/${authData && authData.store_locale}/my-account`));
      toast.success("The otp has been sent on your registered mobile number");
    } else {
      toast.error("Failed to verify OTP Request");
      yield put(actions.sendOTPRequestFailed({}));
    }
  } catch (err) {
    yield put(actions.sendOTPRequestFailed({}));
    toast.error("Failed to verify OTP Request");
  }
};

const verifyOtpRequest = function* verifyOtpRequest({ payload }) {
  try {
    const { data, status } = yield call(api.verifyOTP, payload);
    if (status === 200) {
      yield put(actions.verifyOTPRequestSuccess(data));
      //yield put(push(`/${authData && authData.store_locale}/my-account`));
      toast.success(data && data.Message);
    } else {
      toast.success(data && data.Message);
      yield put(actions.verifyOTPRequestFailed({}));
    }
  } catch (err) {
    // toast.error(
    //     (err && err.response && err.response.data && err.response.data.message) ||
    //         'Something went to wrong, Please try after sometime',
    // );
    yield put(actions.verifyOTPRequestFailed({}));
  }
};

const insertCerificateRequest = function* insertCerificateRequest({ payload }) {
  try {
    const { data, status } = yield call(
      api.insertCerificateDetailsService,
      payload
    );

    if (status === 200) {
      const complianceOfficerData = yield select(complianceOfficer);
      let entityId =
        data && data.table && data.table[0] && data.table[0].entityID;
      let companyName = payload.entityName;
      let obj = { entityID: entityId, companyName: companyName };
      let arr = complianceOfficerData.entityInfo;
      console.log(arr);
      let index = complianceOfficerData.entityInfo.length
        ? 0
        : complianceOfficerData.entityInfo.length;
      arr.push(obj);
      yield put(actions.storeEnityIDwithCompaName(arr));
      yield put(actions.insertCerificateDetailsRequestSuccess(data));
      //yield put(push(`/${authData && authData.store_locale}/my-account`));
      if (payload.from === "delete") {
        toast.success("Company Deleted");
      } else if (payload.from === "saved") {
        toast.success("Company added successfully");
      }
    } else {
      toast.success(data && data.Message);
      yield put(actions.insertCerificateDetailsRequestFailed({}));
    }
  } catch (err) {
    // toast.error(
    //     (err && err.response && err.response.data && err.response.data.message) ||
    //         'Something went to wrong, Please try after sometime',
    // );
    yield put(actions.insertCerificateDetailsRequestFailed({}));
  }

  //payload.history.push("/assign-task")
};

const insertTaskListReq = function* insertTaskListReq({ payload }) {
  try {
    const { data, status } = yield call(api.insertTempTask, payload);
    if (status === 200 && payload && payload.length > 0) {
      toast.success("Tasks are assigned");
      yield delay(1000);
      payload && payload[0].history.push("/otp-verification-co");
    } else {
      toast.error("something went wrong !!!");
    }
  } catch (err) {
    yield put(
      actions.insertTaskListRequestFailed({
        companyType: false,
        companyLicenseData: [],
      })
    );
  }
};

const assignTaskDataReq = function* assignTaskDataReq({ payload }) {
  try {
    const { data } = yield call(api.getAssignedTaskData, payload);
    if (data.message.status) {
      console.log(data);
      yield put(actions.getAssignTaskDataReuestSuccess(data.message));
      //yield put(push(`/${authData && authData.store_locale}/my-account`));
      toast.success(data && data.Message);
    } else {
      toast.success(data && data.Message);
      yield put(actions.getAssignTaskDataReuestFailed());
      // yield put(actions.insertTaskListRequestFailed({ companyType: false, companyLicenseData: [] }));
    }
  } catch (err) {
    // toast.error(
    //     (err && err.response && err.response.data && err.response.data.message) ||
    //         'Something went to wrong, Please try after sometime',
    // );
    yield put(actions.getAssignTaskDataReuestFailed());
  }
};

const governanceDataReq = function* governanceDataReq({ payload }) {
  try {
    const { data } = yield call(api.getGovernanceCompanyData, payload);

    if (data.message) {
      console.log(data);
      yield put(actions.governanceAPIRequestSuccess(data.message));
      toast.success(data && data.message.status_response);
    } else {
      toast.success(data && data.message.status_response);
      yield put(actions.governanceAPIRequestFailed());
    }
  } catch (err) {
    yield put(actions.governanceAPIRequestFailed());
  }
};

const updateMobileNumberOTP = function* updateMobileNumberOTP({ payload }) {
  try {
    const { data, status } = yield call(
      api.checkEmailVerifiedThroughEmail,
      payload
    );
    if (status === 200) {
      let companyName = payload.entityName;
      yield put(
        actions.insUpdateDeletAPIRequestSuccess({
          formDataPersonalData: payload,
          data: data,
          companyName: companyName,
          userInfo: payload,
        })
      );
      let obj = {
        phn: payload.adminMobile,
        email: "",
      };
      apiServices
        .post("/api/sendmsgwithverificationcode", obj)
        .then(function (response) {
          // handle success
          if (
            response &&
            response.data &&
            response.data.otp != "" &&
            response.data.statuscode === "200"
          ) {
            toast.success(
              "The OTP has been sent to your registered mobile number"
            );
          } else {
            toast.error("something went wrong please try again !!!");
          }
        })
        .catch(function (error) {
          if (error) {
          }
        });
      toast.success(data && data.Message);
    }
  } catch (err) {
    // toast.error(
    //     (err && err.response && err.response.data && err.response.data.message) ||
    //         'Something went to wrong, Please try after sometime',
    // );
    //  yield put(actions.updatePhoneNumberOTPRequestFailed());
  }
};

export default function* sagas() {
  yield takeLatest(types.SEND_MAIL_TASK_REQUEST, taskMailRequest);
  yield takeLatest(types.COMPANY_TYPE_REQUEST, companyTypeRequest);
  yield takeLatest(types.VERIFY_EMAIL_REQUEST, verifyEmailReq);
  yield takeLatest(
    types.INS_UPDATE_DELETE_API_REQUEST,
    insertUpdateDeleteAPIReq
  );
  yield takeLatest(types.SEND_OTP_ACTION_REQUEST, otpRequest);
  yield takeLatest(types.VERIFY_OTP_REQUEST, verifyOtpRequest);
  yield takeLatest(
    types.INSERTCERIFICATEDETAILS_REQUEST,
    insertCerificateRequest
  );
  yield takeLatest(types.INSERT_TASK_DATA_REQUEST, insertTaskListReq);
  yield takeLatest(
    types.UPDATE_MOBILE_NUMBER_OTP_REQUEST,
    updateMobileNumberOTP
  );
  yield takeLatest(types.GET_ASSIGN_TASK_DATA_REQUEST, assignTaskDataReq);
  yield takeLatest(types.GOVERNANCEDATA_REQUEST, governanceDataReq);
  yield takeLatest(types.GET_LICENSE_LIST, getLicenseList);
}
