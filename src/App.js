import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import DisplayNotification from "./CommonModules/Notification/Display";
import Notifications from "./CommonModules/Notification";
import { onMessageListener } from "./firebaseConfig/firebaseInit";
import { useSelector, useDispatch } from "react-redux";
import { actions as taskReportActions } from "../src/Components/OnBording/SubModules/DashBoardCO/redux/actions";
function App() {
  return <MainApp />;
}

function MainApp() {
  library.add(faEye, faEyeSlash);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({
    title: "",
    body: "",
    data: "",
  });
  useEffect(() => {
    setShow(false);
  }, []);

  const dispatch = useDispatch();

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
        data: payload.data,
      });
      dispatch(taskReportActions.taskReportRequest());
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <>
      <Router>
        <ToastContainer
          autoClose={5000}
          closeOnClick={false}
          draggable={false}
          hideProgressBar={true}
        />

        <Notifications />

        {show && (
          <DisplayNotification
            title={notification.title}
            body={notification.body}
            data={notification.data}
          />
        )}

        <Route component={AppRouter} />
      </Router>
    </>
  );
}

export default App;
