import React from "react";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import { Input } from "../../components/Inputs/Input";
import { style } from "@mui/system";
import IconButton from "../../components/Buttons/IconButton";
import { MdAddBox } from "react-icons/md";
import {FaPen} from "react-icons/fa"
import Button from "../../components/Buttons/Button";
import {BsCheckCircle,BsFillPlayFill} from "react-icons/bs"
function AuditTemplates() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.top}>
        <div className={styles.heading}>
          <Text heading="h1" size="large" text="Audit Templates" />
        </div>
        <div className={styles.searchBox}>
          <Input type="text" placeholder="Search" variant="searchBox" />
        </div>
      </div>
      <div className={styles.subMenu}>
        <div></div>
        <div className={styles.subMenuList}>
          <IconButton
            description="Create Project"
            variant="createProject"
            icon={<MdAddBox />}
          />
          Sort By {" "}
          <Button description="Names" variant="templatesSortButton" />
          <Button description="created By" variant="templatesSortButton" />
          <Button description="Audit by" variant="templatesSortButton" />
        </div>
      </div>
      <div className={styles.auditTemplateList}>
        <div
          className={`d-none d-md-flex mt-md-3 mb-md-2 ${styles.tableHeader} ${styles.dataContainer} align-items-center justify-content-between`}
        >
          <p
            className={`${styles.tableContainerName} ${styles.tableDataContainerItem}`}
          >
            Template Name
          </p>
          {/* <p className="project-data-container__item">Completed</p> */}
          <p className={`${styles.tableDataContainerItem} wide`}>Completion</p>
          <p className={`${styles.tableDataContainerItem} wide-2`}>Made by</p>
          <p className={`${styles.tableDataContainerItem} wide`}>Audit Type</p>
          <p className={`${styles.tableDataContainerItem} wide-2`}>
            Required Data Points
          </p>
          <p className={styles.tableDataContainerItem}>CheckPoints</p>
          <div className={styles.dataContainersButtons}></div>
        </div>
        <div className={styles.tableBody}>
          <div
            className={`d-none d-md-flex mt-md-3 mb-md-2 ${styles.tableHeader} ${styles.dataContainerBody} align-items-center justify-content-between`}
          >
            <p
              className={`${styles.tableContainerName} ${styles.tableDataContainerItemBody}`}
            >
              Tax Audit
            </p>

            <p className={`${styles.tableDataContainerItemBody} wide`}>30%</p>
            <p className={`${styles.tableDataContainerItemBody} wide-2`}>
              Ramesh
            </p>
            <p className={`${styles.tableDataContainerItemBody} wide`}>
              Internal & Mandatory
            </p>
            <p className={`${styles.tableDataContainerItemBody} wide-2`}>
              8 Question
            </p>
            <p className={styles.tableDataContainerItemBody}>4 Checks</p>
            <div className={styles.dataContainersButtons}>
                <IconButton icon={<FaPen/>} variant="pen"/>
                <IconButton icon={<BsCheckCircle/>} variant="checkButton"/>
                <IconButton icon={<BsFillPlayFill/>} variant="checkButton"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuditTemplates;
