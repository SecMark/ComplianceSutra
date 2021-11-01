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
function App() {
  return <MainApp />;
}

function MainApp() {
  library.add(faEye, faEyeSlash);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  useEffect(() => {
    setShow(false);
  }, []);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
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
          />
        )}

        <Route component={AppRouter} />
      </Router>
    </>
  );
}

export default App;
