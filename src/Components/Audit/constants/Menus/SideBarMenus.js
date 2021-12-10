import taskActive from "../../assets/images/taskActive.png";
import taskInactive from "../../assets/images/taskInactive.png";

import alertActive from "../../assets/images/alertActive.png";
import alertInactive from "../../assets/images/alertInactive.png";

import historyActive from "../../assets/images/historyActive.png";
import historyInactive from "../../assets/images/historyInactive.png";

import groupActive from "../../assets/images/group.png";

import settingActive from "../../assets/images/settingActive.png";
import settingInactive from "../../assets/images/settingInactive.png";

import helpActive from "../../assets/images/helpActive.png";
import helpInactive from "../../assets/images/helpInactive.png";

import userActive from "../../assets/images/userActive.png";
import userInactive from "../../assets/images/userInactive.png";

export const sideBarMenu = [
  {
    path: "",
    name: "",
    component: "",
    activeIcon: taskActive,
    inActiveIcon: taskInactive,
    title: "Task List",
    type: "menus",
  },
  {
    path: "",
    name: "",
    component: "",
    activeIcon: alertActive,
    inActiveIcon: alertInactive,
    title: "Notifications",
    type: "menus",
  },
  {
    path: "",
    name: "",
    component: "",
    activeIcon: historyActive,
    inActiveIcon: historyInactive,
    title: "History",
    type: "menus",
  },
  {
    path: "",
    name: "",
    component: "",
    activeIcon: groupActive,
    inActiveIcon: groupActive,
    title: "Circulars",
    type: "menus",
  },
  {
    path: "",
    name: "",
    component: "",
    activeIcon: settingActive,
    inActiveIcon: settingInactive,
    title: "Setting",
    type: "settingMenus",
  },
  {
    path: "",
    name: "",
    component: "",
    activeIcon: helpActive,
    inActiveIcon: helpInactive,
    title: "Help",
    type: "settingMenus",
  },
  {
    path: "",
    name: "",
    component: "",
    activeIcon: userActive,
    inActiveIcon: userInactive,
    title: "Profile",
    type: "userMenu",
  },
];
