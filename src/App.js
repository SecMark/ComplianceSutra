import React, { useEffect } from "react";
import { Router, Route, Switch, BrowserRouter } from "react-router-dom";
import { browserHistory } from "react-router";
import AppRouter from "./router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return <MainApp />;
}

function MainApp() {
  // eslint-disable-next-line

  return (
    <>
      <BrowserRouter>
        <ToastContainer
          autoClose={5000}
          closeOnClick={false}
          draggable={false}
          hideProgressBar={true}
        />
        <Switch>
          <Route component={AppRouter} />
        </Switch>
 module/CircularManagement
      </Router>
      </BrowserRouter>
 SuperAdminModule
    </>
  );
}

export default App;
