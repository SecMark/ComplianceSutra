import React, { useHistory } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
function App() {
  return <MainApp />;
}

function MainApp() {
  library.add(faEye, faEyeSlash);

  return (
    <>
      <Router>
        <ToastContainer
          autoClose={5000}
          closeOnClick={false}
          draggable={false}
          hideProgressBar={true}
        />
        <Route component={AppRouter} />
      </Router>
    </>
  );
}

export default App;
