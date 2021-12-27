import React, { useState } from "react";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import { Input } from "../../components/Inputs/Input";
import IconButton from "../../components/Buttons/IconButton.jsx";
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import {useSelector,useDispatch} from "react-redux";


function AddressDetails() {
  const [auditTeamDetails, setAuditTeamDetails] = useState([
    {
      team_member_name: "",
      team_member_email: "",
      designation: "",
    },
  ]);
  const [branchLocation, setBranchLocation] = useState({
    address1: "",
    address2: "",
    picode: "",
    state: "",
    city: "",
  });
  const [branchIncharge, setBranchIncharge] = useState({
    branch_audit_incharge: "",
    branch_audit_incharge_email: "",
  });

  console.log("team details", auditTeamDetails);

  //function to store branch Location data
  const branchLocationData = (event) => {
    const value = event.target.value;
    setBranchLocation({
      ...branchLocation,
      [event.target.name]: value,
    });
  };

  //function to store branch Incharge Data
  const branchInchargeData = (event) => {
    const value = event.target.value;
    setBranchIncharge({
      ...branchIncharge,
      [event.target.name]: value,
    });
  };


  // Audit Team Details functions ------>
  //function to set Audit team state
  const auditTeamInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...auditTeamDetails];
    list[index][name] = value;
    setAuditTeamDetails(list);
  };

  //function to remove Audit team Details Field
  const removeAuditTeamFileds = (index) => {
    const list = [...auditTeamDetails];
    list.splice(index, 1);
    setAuditTeamDetails(list);
  };

  //function to add new Team Member Details
  const addTeamMemberField = () => {
    setAuditTeamDetails([
      ...auditTeamDetails,
      {
        team_member_name: "",
        team_member_email: "",
        designation: "",
      },
    ]);
  };

  return (
    <>
      <Text heading="p" text="branch location" variant="stepperSubHeading" />
      <div className={styles.inputRow}>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="Address 1"
            placeholder="Eg. Street No./House No."
            labelVariant="labelGreyMini"
            name="address1"
            onChange={branchLocationData}
          />
        </div>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="Address 2"
            placeholder="Eg. Gali No./ Nearby location"
            labelVariant="labelGreyMini"
            name="address2"
            onChange={branchLocationData}
          />
        </div>
      </div>
      <div className={styles.inputRow}>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="pincode"
            placeholder="Enter 6 digit pincode"
            labelVariant="labelGreyMini"
            name="pincode"
            onChange={branchLocationData}
          />
        </div>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="District/City"
            placeholder="Enter district/city here"
            labelVariant="labelGreyMini"
            name="city"
            onChange={branchLocationData}
          />
        </div>
      </div>
      <div className={`${styles.inputRow} ${styles.inputRowSpacing}`}>
        <div className={styles.flex6}>
          <Input
            type="select"
            variant="auditAssignmentInput"
            labelText="state"
            placeholder="Select State"
            labelVariant="labelGreyMini"
            name="state"
            onChange={branchLocationData}
            valueForDropDown={[
              { label: "Delhi", value: "Delhi" },
              { label: "Mumbai", value: "Mumbai" },
              { label: "Uttar Pradesh", value: "Uttar Pradesh" },
            ]}
          />
        </div>
      </div>
      <Text
        heading="p"
        text="branch incharge details"
        variant="stepperSubHeading"
      />
      <div className={`${styles.inputRow} ${styles.inputRowSpacing}`}>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="branch audit incharge"
            placeholder="Enter audit incharge name here"
            labelVariant="labelGreyMini"
            name="branch_audit_incharge"
            onChange={branchInchargeData}
          />
        </div>
        <div className={styles.flex6}>
          <Input
            type="email"
            variant="auditAssignmentInput"
            labelText="audit incharge's email id"
            placeholder="Enter Email Id here"
            labelVariant="labelGreyMini"
            name="branch_audit_incharge_email"
            onChange={branchInchargeData}
          />
        </div>
      </div>
      <Text
        heading="p"
        text="audit team details (Optional)"
        variant="stepperSubHeading"
      />
      <div>
        {auditTeamDetails.map((item, index) => {
          return (
            <>
              <div className={styles.inputRow}>
                <div className={styles.flex6}>
                  <Input
                    variant="auditAssignmentInput"
                    labelText="team member's name"
                    placeholder="Enter name"
                    labelVariant="labelGreyMini"
                    name="team_member_name"
                    value={item.team_member_name}
                    onChange={(event) => auditTeamInputChange(event, index)}
                  />
                </div>
                <div className={styles.flex6}>
                  <Input
                    type="email"
                    variant="auditAssignmentInput"
                    labelText="team member's email id"
                    placeholder="Enter Email Id here"
                    labelVariant="labelGreyMini"
                    name="team_member_email"
                    value={item.team_member_email}
                    onChange={(event) => auditTeamInputChange(event, index)}
                  />
                </div>
              </div>
              <div
                className={`${styles.inputRow} ${styles.inputRowSpacingTeamSection}`}
              >
                <div className={styles.flex6}>
                  <Input
                    type="select"
                    variant="auditAssignmentInput"
                    labelText="team member's designation"
                    placeholder="Select designation"
                    labelVariant="labelGreyMini"
                    name="designation"
                    value={item.designation}
                    onChange={(event) => auditTeamInputChange(event, index)}
                    valueForDropDown={[
                      { label: "Team Member", value: "Team Member" },
                      {
                        label: "Compliance Officer",
                        value: "Compliance Officer",
                      },
                      { label: "Approver", value: "Approver" },
                    ]}
                  />
                </div>
              </div>
              {auditTeamDetails.length !== 1 && (
                <IconButton
                  icon={<AiFillDelete />}
                  variant="removeIcon"
                  description="Remove"
                  onClick={() => removeAuditTeamFileds(index)}
                  size="small"
                />
              )}
              {auditTeamDetails.length - 1 === index && (
                <IconButton
                  icon={<AiFillPlusCircle />}
                  variant="addIcon"
                  description="ADD NEW MEMBER"
                  onClick={addTeamMemberField}
                  size="small"
                />
              )}
            </>
          );
        })}
      </div>
    </>
  );
}

export default AddressDetails;
