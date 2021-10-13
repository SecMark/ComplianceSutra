import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { browserHistory } from "react-router";
import AppRouter from "./router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  return <MainApp />;
}

function MainApp() {
  // eslint-disable-next-line

  return (
    <Router>
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
  );
}

export default App;
