import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AppRouter from "./router";
import { useDispatch, useSelector } from "react-redux";
import { createHashHistory } from 'history';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../src/apiServices";
import { actions as notificationActions } from "./Components/OnBording/SubModules/DashBoardCO/redux/actions";
import CoSetting from "./Components/OnBording/SubModules/DashBoardCO/components/CoSetting";
import MultipleNotification from "../src/CustomNotification/MultipleNotification";
import SingleNotification from "../src/CustomNotification/SingleNotification"
function App() {
  return <MainApp />;
}


function MainApp() {
  // eslint-disable-next-line
  const toastId = React.useRef(null);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.warn = (message, ...args) => { };
  console.warn = () => { };
  console.error = () => { }
  const browserHistory = createHashHistory();
  const userID = state && state.auth && state.auth.loginInfo && state.auth.loginInfo.UserID
  useEffect(() => {

    const interval = setInterval(() => {
      try {
        if (userID) {
          notificationAPICall();
        }
      }
      catch (err) { }
    }, 60000)

    return () => clearInterval(interval);
  }, [])

  const notificationAPICall = () => {
    let notificationArr = [];
    const payload = {
      userID: userID,
    }
    api.post("/api/Notifications", payload)
      .then(function (response) {
        var date1 = new Date();//current time
        if (response && response.data && response.data.length > 0) {
          let notification = response && response.data
          var notificationDateTime;
          var date2;
          var timeDiff;
          notification && notification.length > 0 && notification.map((item, index) => {
            notificationDateTime = item.date;
            date2 = new Date(notificationDateTime);
            timeDiff = Math.abs(date2.getTime() - date1.getTime()); // in miliseconds
            if (timeDiff < 60000) {
              notificationArr.push(item);
            }
          })
          if (notificationArr && notificationArr.length > 0) {
            if (notificationArr.length === 1) {
              toast.success(<SingleNotification id={toastId.current} toast={toast} notification={notificationArr[0]} />)
            } else {
              toast.success(<MultipleNotification id={toastId.current} toast={toast} notificationCount={notificationArr.length} />)
            }
          } else {
          }
        }
        else {
        }
      })
      .catch(function (error) {
        if (error) {
        }
      });
  }
  return (
    <>

      <Router history={browserHistory}>
        <ToastContainer
          autoClose={5000}
          closeOnClick={false}
          draggable={false}

          hideProgressBar={true} />
        <Switch>
          <Route component={AppRouter} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
