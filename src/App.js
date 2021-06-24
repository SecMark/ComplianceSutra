import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import AppRouter from "./router";
import { useDispatch, useSelector } from "react-redux";
import { createHashHistory } from 'history';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../src/apiServices"
import CoSetting from "./Components/OnBording/SubModules/DashBoardCO/components/CoSetting";
function App() {
  return <MainApp />;
}
function MainApp() {
  // eslint-disable-next-line
  const state = useSelector((state) => state);
  console.warn = (message, ...args) => { };
  console.warn = () => { };
  const browserHistory = createHashHistory();
  const userID = state && state.auth && state.auth.loginInfo && state.auth.loginInfo.UserID

  useEffect(() => {

    const interval = setInterval(() => {
      try {
        if (userID) {
          changeSettingFlagAPICall();
        }
      }
      catch (err) { }
    }, 60000)

    return () => clearInterval(interval);
  }, [])


  const changeSettingFlagAPICall = () => {
    const payload = {
      userID: userID,
    }
    api.post("/api/Notifications", payload)
      .then(function (response) {
        var date1 = new Date();//current time
        if (response && response.data && response.data[0]) {
          let notification = response && response.data && response.data[0];
          var notificationDateTime = notification.date;
          var date2 = new Date(notificationDateTime);
          var timeDiff = Math.abs(date2.getTime() - date1.getTime()); // in miliseconds

          if (timeDiff < 45000) {
            if (notification && notification.Comment) {
              var text = notification.Comment.replace(/(<([^>]+)>)/g, "");
              toast.success(text)
            }

          }
        } else {
        }
      })
      .catch(function (error) {
        if (error) {
        }
      });
  }
  return (
    <>
      <ToastContainer
      autoClose={5000}
       hideProgressBar={true} />
      <Router history={browserHistory}>
        <Switch>
          <Route component={AppRouter} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
