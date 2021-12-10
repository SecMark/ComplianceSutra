import React from "react";
import Image from "../Images/Image";
import styles from "./style.module.scss";
import sideBarLogo from "../../assets/images/sideBarlogo.png";
import { sideBarMenu } from "../../constants/Menus/SideBarMenus";

const SideBar = () => {
  return (
    <div className={styles.bar}>
      <div className={styles.menuslist}>
        <div className={styles.logo}>
          <Image src={sideBarLogo} alt="SideBar Logo" />
        </div>
        <div className={styles.menus}>
          {sideBarMenu.map((menus, index) => {
            return (
              menus.type === "menus" && (
                <div className={styles.menusitem} key={index}>
                  <Image
                    src={menus.inActiveIcon}
                    alt="SideBar Logo"
                    title={menus.title}
                    key={index}
                  />
                </div>
              )
            );
          })}
        </div>
        <div className={styles.settingmenus}>
          <div className="dividerline"></div>
          {sideBarMenu.map((menus, index) => {
            return (
              menus.type === "settingMenus" && (
                <div className={styles.menusitem} key={index}>
                  <Image
                    src={menus.inActiveIcon}
                    alt="SideBar Logo"
                    title={menus.title}
                    key={index}
                  />
                </div>
              )
            );
          })}

          <div className={styles.usermenus}>
            {sideBarMenu.map((menus, index) => {
              return (
                menus.type === "userMenu" && (
                  <div className={styles.menusitem} key={index}>
                    <Image
                      src={menus.inActiveIcon}
                      alt="SideBar Logo"
                      title={menus.title}
                      key={index}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
