import React from "react";
import templateListInfo from "../../../constants/TemplateListData";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import IconButton from "../../../components/Buttons/IconButton";
import styles from "./style.module.scss";
import { headingTable } from "../../../constants/TemplateListData/headTable";

function AuditTemplateList() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {headingTable.map((item) => (
              <th>{item.headName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {templateListInfo.map((items, index) => (
            <tr key={index}>
              <td>{items.templateName}</td>
              <td
                className={
                  index === 0 ? styles.completedRed : styles.completedGreen
                }
              >
                {items.complition}
              </td>
              <td>{items.madeby}</td>
              <td>{items.auditType}</td>
              <td>{items.requiredDataPoints}</td>
              <td>{items.checkpoints}</td>
              <td>
                <IconButton icon={<AiOutlineEdit />} variant="editIcon" />
              </td>
              <td className={styles.templateStatus}>{items.templateStatus}</td>
              <td className={styles.auditStatus}>{items.aditStatus}</td>
              <td>
                <IconButton icon={<AiOutlineRight />} variant="rightIcon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuditTemplateList;
