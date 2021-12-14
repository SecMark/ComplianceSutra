import React from "react";
import Landing from "../../pages/Landing";
import SideBar from "../SideBar/SideBar";
import styles from "./style.module.scss";
import { Route, Routes } from "react-router-dom";
import FormBuilder from "../../pages/FormBuilder";
import CheckList from "../../pages/FormBuilder/CheckList";
import AuditAssignment from "../../pages/AuditAssignment";

const Layout = () => {
  return (
    <div className={styles.maincontainer}>
      <div className={styles.leftsidebar}>
        <SideBar />
      </div>
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/questionaire" element={<FormBuilder />} />
          <Route path="/checklist" element={<CheckList />} />
          <Route exact path="/audit-assignment" element={<AuditAssignment />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
