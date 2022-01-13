import React from "react";
import SideBar from "../SideBar/SideBar";
import styles from "./style.module.scss";
import FormBuilder from "../../pages/FormBuilder";
import CheckList from "../../pages/FormBuilder/CheckList";
import { ToastContainer } from "react-toastify";
import AuditAssignment from "../../pages/AuditAssignment";
import AuditTemplates from "../../pages/AuditTemplates";
import Assignments from "../../pages/Assignments";
import { useRouteMatch, Route, Switch } from "react-router";
import Container from "../Containers";
import SectionList from "../../pages/List/SectionList";
const Layout = () => {
  const { path, url } = useRouteMatch();
  return (
    <Container variant="main">
      <ToastContainer />
      <div className={styles.leftsidebar}>
        <SideBar />
      </div>
      <Container variant="container">
        <Switch>
          <Route exact path={`${path}`}>
            <AuditTemplates />
          </Route>
          <Route exact path={`${path}`}>
            <Assignments />
          </Route>
          <Route exact path={`/${path}/questionaire`}>
            <FormBuilder />
          </Route>
          <Route path={`/${path}/checklist`}>
            <CheckList />
          </Route>
          <Route exact path={`${path}/audit-assignment`}>
            <AuditAssignment />
          </Route>
          <Route exact path={`${path}/create-template`}>
            <FormBuilder />
          </Route>
        </Switch>
      </Container>
    </Container>
  );
};

export default Layout;
