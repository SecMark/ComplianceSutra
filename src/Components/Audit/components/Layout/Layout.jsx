import React from "react";
import SideBar from "../SideBar/SideBar";
import styles from "./style.module.scss";
import FormBuilder from "../../pages/FormBuilder";
import CheckList from "../../pages/FormBuilder/CheckList";
import { ToastContainer } from "react-toastify";
import AuditAssignment from "../../pages/AuditAssignment";
import AuditTemplates from "../../pages/AuditTemplates";
import AuditUsers from "../../pages/AuditUsers";
import Assignments from "../../pages/Assignments/";
import { useRouteMatch, Route, Switch } from "react-router";
import Container from "../Containers";
import SectionList from "../../pages/List/SectionList";
import TaxAudit from "../../pages/AuditTemplates/TaxAudit";
import TaxAuditAssignment from "../../pages/Assignments/TaxAuditAssignment";
import WorkAuditUser from "../../pages/AuditUsers/WorkAuditUser";
import TaxAuditUser from "../../pages/AuditUsers/TaxAuditUser";
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
          <Route exact path={`${path}/users`}>
            <AuditUsers />
          </Route>
          <Route exact path={`${path}/assignments`}>
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
          <Route exact path={`${path}/template`}>
            {/* <div className="create-template"> */}
            <TaxAudit />
            {/* </div> */}
          </Route>
          <Route exact path={`${path}/assignments/assignment`}>
            <TaxAuditAssignment />
          </Route>
          <Route exact path={`${path}/users/work-user`}>
            <WorkAuditUser />
          </Route>
          <Route exact path={`${path}/users/work-user/complete-work`}>
            <TaxAuditUser />
          </Route>
          <Route exact path={`${path}/users/work-user/current-work`}>
            <TaxAuditUser />
          </Route>
        </Switch>
      </Container>
    </Container>
  );
};

export default Layout;
