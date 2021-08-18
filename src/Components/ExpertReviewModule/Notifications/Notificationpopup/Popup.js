import React, { useState } from "react";
import "../Notifications.css";
import { BiDotsVerticalRounded } from "react-icons/bi";

const Popup = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="PopupMain">
      <div>
        <button className="Menu" onClick={() => setShowMenu(!showMenu)}>
          <BiDotsVerticalRounded />
        </button>
      </div>
      {(showMenu && (
        <div className="MenuList">
          <button className="MenuItem1">Mark all Read</button>
          <button className="MenuItem2">Mark all Unread</button>
        </div>
      )) ||
        null}
    </div>
  );
};
export default Popup;
