import React, { useEffect } from "react";
import CheckIcon from "../../../assets/Images/Onboarding/checkIcon.png";
import { withRouter } from 'react-router-dom';
import api from '../../../apiServices'
let emailFromLink = "";
let typeFromLink = "";
function YourAreDone({ history }) {
  useEffect(() => {

    let location = window.location.href;
    let data = location.split("=");
    let splitEmailAndType = data && data[1].split("&");
    emailFromLink = splitEmailAndType[0];
    typeFromLink = data[2];
    verifyEmail(emailFromLink)

  }, [])

  const verifyEmail = (email) => {
    let payload = {
      loginID: email,
      pwd: "",
      rememberme: 0,
      loginty: "AdminEmail",
    };
    if (email != "")
      api
        .post("/api/availabilityCheck", payload)
        .then(function (response) {
          // handle success
          if (response && response.data && response.data.Status === "True") {
            setTimeout(() => {
              history.push("/login")
            }, 2000)
          } else {
            setTimeout(() => {
              history.push(`/user-details-verification?email=${emailFromLink}&type=${typeFromLink}`)
            }, 2000);
          }
        })
        .catch(function (error) {
          if (error) {

          }
        });
  }
  return (
    <div className="you-are-done">
      <div className="text-section">
        <img src={CheckIcon} alt="CheckIcon" />
        <p className="title"> Wait while verify you! </p>
        <p className="desc">Taking you to the verification process</p>
        {/* <p className="desc">Taking you to the dashboard</p> */}
      </div>
    </div>
  );
}

export default withRouter(YourAreDone);