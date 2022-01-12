import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./style.module.scss";

const SideBar = () => {
  const history = useHistory();
  const [pathName, setPathName] = useState(window?.location?.pathname);
  const redirectTo = (route) => {
    setPathName(route);
    history.push(route);
  };
  return (
    <div className={styles.bar}>
      <div className={styles.heading}>
        <h1>Audit</h1>
      </div>
      <div className={styles.navigationMenu}>
        <ul>
          <li
            className={pathName === "/audit" ? styles.activeClass : ""}
            onClick={() => redirectTo("/audit")}
          >
            <span>Templates</span>
          </li>
          <li>
            <span>Assignments</span>
          </li>
          <li
            className={pathName === "/audit/users" ? styles.activeClass : ""}
            onClick={() => redirectTo("/audit/users")}
          >
            <span>Users</span>
          </li>
          <li>
            <span>Company</span>
          </li>
          <li>
            <span>Clients</span>
          </li>
          <li>
            <span>SubOrdinate</span>
          </li>
          <li>
            <span>Audit</span>
          </li>
          <li>
            <span>Audit Template</span>
          </li>
          <li onClick={() => redirectTo("audit-assignment")}>
            <span>Audit Assignmet</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
