import React from "react";
import { useHistory } from "react-router";
import styles from "./style.module.scss";

const SideBar = () => {
  const history = useHistory();
  const navigateTo = (url) => {
    history.push(url);
  };
  return (
    <div className={styles.bar}>
      <div className={styles.heading}>
        <h1>Audit</h1>
      </div>
      <div className={styles.navigationMenu}>
        <ul>
          <li
            className={styles.activeClass}
            onClick={() => navigateTo("/audit")}
          >
            <span>Templates</span>
          </li>
          <li>
            <span>Assignments</span>
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
          <li>
            <span>Audit Assignmet</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
