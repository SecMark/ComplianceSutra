import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { IoIosAddCircle } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import "../style.css";

const SASubLicense = ({ licenseColor, setLicenseColor, color, setColor }) => {
  const ColorChanged = (color) => {
    setLicenseColor([
      ...licenseColor,
      {
        label: color,
        value: color,
      },
    ]);
    setColor(color);
    setColorPopup(false);
  };
  const [colorPopup, setColorPopup] = useState(false);

  return (
    <div>
      <div className="SubLicenseElement">
        <h5>SubLicense Details</h5>
        <button>
          <IoIosAddCircle
            style={{
              marginRight: "7px",
              width: "20px",
              height: "20px",
            }}
          />
          ADD NEW SUB LICENSE
        </button>
      </div>
      <div className="SubLicenseElement">
        <h5>Additional Attachments </h5>
        <button>
          <IoIosAddCircle
            style={{
              marginRight: "7px",
              width: "20px",
              height: "20px",
            }}
          />
          ADD NEW FILE
        </button>
      </div>
      <div className="SubLicenseElement">
        <h5>License Tag Color Details </h5>
        <p
          style={{
            backgroundColor: "#b3abc415",
            color: color,
            width: "40%",
            fontWeight: "600",
          }}
        >
          PORTFOLIO MANAGER
        </p>
        <div className="LicenseColorContainer">
          {licenseColor.map((element) => {
            return (
              <div
                className="LicenseColor"
                onClick={() => setColor(element.value)}
              >
                {(color === element.value && (
                  <div>
                    <button
                      style={{
                        backgroundColor: element.value,
                        border: "1px solid black",
                      }}
                    >
                      <TiTick
                        style={{
                          width: "9px",
                          height: "9px",
                          backgroundColor: "#505050",
                          borderRadius: "20px",
                          color: "white",
                          marginBottom: "-17px",
                        }}
                      />
                    </button>
                    <p style={{ fontSize: "9px" }}>{element.label}</p>
                  </div>
                )) || (
                  <div>
                    <button style={{ backgroundColor: element.value }}></button>
                  </div>
                )}
              </div>
            );
          })}
          <div>
            <button onClick={() => setColorPopup(!colorPopup)} id="CustomColor">
              ADD CUSTOM
            </button>
          </div>
          {(colorPopup && (
            <div>
              <HexColorPicker
                color={color}
                onChange={ColorChanged}
                style={{
                  position: "absolute",
                  top: "20vw",
                  right: "10vw",
                }}
              />
            </div>
          )) ||
            null}
        </div>
      </div>
    </div>
  );
};
export default SASubLicense;
