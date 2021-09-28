import React from "react";
import { MdClear } from "react-icons/md";
import "./style.css";
const Drawer = ({ children, isOpen, setIsOpen, width }) => {
  return (
    <div className={`cs-drawer ${isOpen && "cs-drawer--open"}`}>
      <div
        className="cs-drawer__container"
        style={{ width: `${width || 629}px`, right: isOpen ? "0px" : "-629px" }}
      >
        <div className="cs-drawer__content position-relative">
          <button
            className="cs-drawer__close-button"
            onClick={() => setIsOpen(false)}
          >
            <MdClear />
          </button>
          {children}
          {/* Horizontal Line */}
           {/* <div className="cs-drawer__horizontal-line"></div>  */}

          {/* All types of Button */}
         {/* <button className="cs-drawer__button cs-drawer__button--stroke">
            stroke
          </button>
          <button className="cs-drawer__button cs-drawer__button--primary mx-3">
            primary
          </button>
          <button className="cs-drawer__button cs-drawer__button--outlined">
            outlined
          </button>  */}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
