import React from "react";
import Landing from "../../pages/Landing";
import SideBar from "../SideBar/SideBar";
import styles from "./style.module.scss";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import FormBuilder from "../../pages/FormBuilder";
import CheckList from "../../pages/FormBuilder/CheckList";
import { ToastContainer } from "react-toastify";
import AuditAssignment from "../../pages/AuditAssignment";
import AuditTemplates from "../../pages/AuditTemplates";
const Layout = () => {
  let { path } = useRouteMatch();

  return (
    <div className={styles.maincontainer}>
      <ToastContainer />
      <div className={styles.leftsidebar}>
        <SideBar />
      </div>
      <div className={styles.container}>
        <Switch>
          <Route exact path={`${path}`} component={AuditTemplates} />
          <Route exact path={`${path}/questionaire`} component={FormBuilder} />
        </Switch>
      </div>
    </div>
  );
};

export default Layout;
