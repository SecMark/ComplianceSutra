import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AppRouter from "./router";
import { useDispatch, useSelector } from "react-redux";
import { createHashHistory } from "history";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../src/apiServices";
import { actions as notificationActions } from "./Components/OnBording/SubModules/DashBoardCO/redux/actions";
import CoSetting from "./Components/OnBording/SubModules/DashBoardCO/components/CoSetting";
import MultipleNotification from "../src/CustomNotification/MultipleNotification";
import SingleNotification from "../src/CustomNotification/SingleNotification";
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
function App() {
  return <MainApp />;
}

function MainApp() {
  // eslint-disable-next-line
  const toastId = React.useRef(null);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.warn = (message, ...args) => {};
  console.warn = () => {};
  console.error = () => {};
  const browserHistory = createHashHistory();

  return (
    <>
      <Router history={browserHistory}>
        <ToastContainer
          autoClose={5000}
          closeOnClick={false}
          draggable={false}
          hideProgressBar={true}
        />
        <Switch>
          <Route component={AppRouter} />
        </Switch>
      </Router>

    </>
  );
}

export default App;
