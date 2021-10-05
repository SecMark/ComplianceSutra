import React from "react";
import "./style.css";

const DiscountMethods = (props) => {
  return (
    <div className="discount-methods">
      <h5 style={{paddingTop:"25px"}}>Select Discount Type</h5>
      <ul>
        <li>
          <input type="checkbox" />
          <span>Percentage Discount on Total Tool Charges</span>
        </li>
        <li>
          <input type="checkbox" />
          <span>Additional Months upon payment</span>
        </li>
        <li>
          <input type="checkbox" />
          <span>Additional Licenses mangement</span>
        </li>
        <li>
          <input type="checkbox" />
          <span>Percentage Discount on Total Tool Charges</span>
        </li>
        <li>
          <input type="checkbox" />
          <span>Complementary Expert Review service</span>
        </li>
        <li>
          <input type="checkbox" />
          <span>Additional Trail Days</span>
        </li>
        <li>
          <input type="checkbox" />
          <span>Additional user account upon payment</span>
        </li>
      </ul>
    </div>
  );
};

export default DiscountMethods;
