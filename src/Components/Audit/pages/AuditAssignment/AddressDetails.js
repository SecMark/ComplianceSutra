import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import { Input } from "../../components/Inputs/Input";
import IconButton from "../../components/Buttons/IconButton.jsx";
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Buttons/Button";
import axiosInstance from "../../../../apiServices";
import { toast } from "react-toastify";
import BackDrop from "../../../../CommonModules/sharedComponents/Loader/BackDrop";

function AddressDetails({
  next,
  stepper,
  auditTeamDetails,
  setAuditTeamDetails,
  branchData,
  setBranchData,
}) {
  const [assignmentId, setAssignmentId] = useState("");
  const[isLoading,setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    address_title: "",
    address_line1: "",
    pincode: "",
    state: "",
    city: "",
    branch_auditor_incharge: "",
    auditor_incharge_email: "",
  });
  const state = useSelector((state) => state);

  //email validation
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
 
  //function to store branch Location data
  const onBranchData = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "address_title":
        setErrors({
          ...errors,
          address_title: value.length === 0 ? "please enter address" : "",
        });
        break;
      case "address_line1":
        setErrors({
          ...errors,
          address_line1: value.length === 0 ? "please enter address" : "",
        });
        break;
      case "pincode":
        setErrors({
          ...errors,
          pincode: value.length === 6 ? "" : "please enter 6 digit pincode",
        });
        break;
      case "state":
        setErrors({
          ...errors,
          state: value.length === 0 ? "please enter state" : "",
        });
        break;
      case "city":
        setErrors({
          ...errors,
          city: value.length === 0 ? "please enter city" : "",
        });
        break;
      case "branch_auditor_incharge":
        setErrors({
          ...errors,
          branch_auditor_incharge:
            value.length === 0 ? "please enter auditor incharge" : "",
        });
        break;
      case "auditor_incharge_email":
        setErrors({
          ...errors,
          auditor_incharge_email: validEmailRegex.test(value)
            ? ""
            : "Email is not valid",
        });
        break;
    }
    setBranchData({
      ...branchData,
      [name]: value,
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
        team_member: "",
        team_member_email: "",
        designation: "",
      },
    ]);
  };

  //form validate function
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  //pincode check function and set state & city
  const pinCodeCehck = async (val) => {
    try {
      const data = await axiosInstance.post("audit.api.CheckPincode", {
        pincode: branchData?.pincode,
      });
      if (data?.data?.message.status === true) {
        setBranchData({
          ...branchData,
          pincode: val,
          state: data.data.message.state,
          city: data.data.message.city,
        });
        setErrors({
          ...errors,
          pincode: "",
        });
      } else {
        setErrors({
          ...errors,
          pincode: "Invalid Pincode",
        });
      }
    } catch (err) {}
  };

  //final data submit function
  const callDataSubmitApi = () => {
    if (branchData.address_title.length === 0) {
      toast.error("please enter Address line 1");
      setErrors({
        ...errors,
        address_title: "please enter address",
      });
    } else if (branchData.address_line1.length === 0) {
      toast.error("please enter address line 2");
      setErrors({
        ...errors,
        address_line1: "please enter address",
      });
    } else if (branchData.pincode.length === 0) {
      toast.error("Please enter pincode");
      setErrors({
        ...errors,
        pincode: "please enter a pincode",
      });
    } else if (branchData.state.length === 0) {
      toast.error("please provide state");
      setErrors({
        ...errors,
        state: "please provide state",
      });
    } else if (branchData.city.length === 0) {
      toast.error("please provide city");
      setErrors({
        ...errors,
        city: "please provide city",
      });
    } else if (branchData.branch_auditor_incharge.length === 0) {
      toast.error("please provide branch auditor incharge");
      setErrors({
        ...errors,
        branch_auditor_incharge: "please provide branch auditor incharge",
      });
    } else if (branchData.auditor_incharge_email.length == 0) {
      toast.error("please provide email for branch incharge");
      setErrors({
        ...errors,
        auditor_incharge_email: "please provide email for incharge",
      });
    } else {
      if (validateForm(errors)) {
        submitData();
      } else {
        toast.error("please fill the valid and required fields");
      }
    }
  };

  //function to check team detail data is empty or not 
  const checkTeamDetailsData = ()=>{
    let arr = false;
     auditTeamDetails.map((item)=>{
       if(item.team_member.length === 0 || item.team_member_email.length === 0 || item.designation.length === 0 ){
          arr = false
       }
       else{
          arr = true
       }
     })
     return arr;
     
  }

  //Data Submit api function
  const submitData =  () => {
    setIsLoading(true);
    const formData = new FormData();
    
    formData.append("assignment_id", state?.AuditReducer?.assignmentId);
    for (const key in branchData) {
      formData.append(key, branchData[key]);
    }
    // checkTeamDetailsData();
    formData.append("audit_team_details",checkTeamDetailsData()?JSON.stringify(auditTeamDetails):[]);
    // formData.append("audit_team_details", JSON.stringify(auditTeamDetails));
    console.log("formdata",formData);
    try {
       axiosInstance.post(
        "audit.api.AddAddressAndAuditorDetails",
        formData
      ).then((data)=>{
        if (data?.data.message.status === true) {
          setIsLoading(false);
          next(stepper?.stepperAcitveSlide);
        } else {
          setIsLoading(false);
          toast.error("Somthing went wrong please try again");
        }
      }).catch((err)=>{
        setIsLoading(false);
        console.log(err)
      });
      // console.log("audit details address api call", data);
      
    } catch (err) {
      console.log("exception error",err);
    }
  };

  return (

    <>
    <BackDrop isLoading={isLoading}/>
      <Text heading="p" text="branch location" variant="stepperSubHeading" />
      <div className={styles.inputRow}>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="Address 1"
            placeholder="Eg. Street No./House No."
            labelVariant="labelGreyMini"
            name="address_title"
            onChange={onBranchData}
            value={branchData.address_title}
          />
          {errors?.address_title.length > 0 &&
             <Text
             heading="p"
             variant="error"
             text={errors.address_title}
           />
          } 
        </div>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="Address 2"
            placeholder="Eg. Gali No./ Nearby location"
            labelVariant="labelGreyMini"
            name="address_line1"
            onChange={onBranchData}
            value={branchData.address_line1}
          />
          {errors?.address_line1.length > 0 &&
             <Text
             heading="p"
             variant="error"
             text={errors.address_line1}
           />
          } 
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
            onChange={onBranchData}
            value={branchData.pincode}
            onBlur={(event) => {
              pinCodeCehck(event.target.value);
            }}
          />
          {errors?.pincode.length > 0 &&
             <Text
             heading="p"
             variant="error"
             text={errors.pincode}
           />
          } 
        </div>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="District/City"
            placeholder="Enter district/city here"
            labelVariant="labelGreyMini"
            name="city"
            onChange={onBranchData}
            value={branchData.city}
          />
          {errors?.city.length > 0 &&
             <Text
             heading="p"
             variant="error"
             text={errors.city}
           />
          } 
        </div>
      </div>
      <div className={`${styles.inputRow} ${styles.inputRowSpacing}`}>
        <div className={styles.flex6}>
          <Input
            type="text"
            variant="auditAssignmentInput"
            labelText="state"
            placeholder="Select State"
            labelVariant="labelGreyMini"
            name="state"
            onChange={onBranchData}
            value={branchData.state}
            // valueForDropDown={[
            //   { label: "Delhi", value: "Delhi" },
            //   { label: "Mumbai", value: "Mumbai" },
            //   { label: "Uttar Pradesh", value: "Uttar Pradesh" },
            // ]}
          />
          {errors?.state.length > 0 &&
             <Text
             heading="p"
             variant="error"
             text={errors.state}
           />
          } 
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
            name="branch_auditor_incharge"
            onChange={onBranchData}
            value={branchData.branch_auditor_incharge}
          />
          {errors?.branch_auditor_incharge.length > 0 &&
             <Text
             heading="p"
             variant="error"
             text={errors.branch_auditor_incharge}
           />
          } 
        </div>
        <div className={styles.flex6}>
          <Input
            type="email"
            variant="auditAssignmentInput"
            labelText="audit incharge's email id"
            placeholder="Enter Email Id here"
            labelVariant="labelGreyMini"
            name="auditor_incharge_email"
            onChange={onBranchData}
            value={branchData.auditor_incharge_email}
          />
          {errors?.auditor_incharge_email.length > 0 &&
             <Text
             heading="p"
             variant="error"
             text={errors.auditor_incharge_email}
           />
          } 
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
                    name="team_member"
                    value={item.team_member}
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
      <div className={styles.buttonContainer}>
        <Button
          description="Next"
          onClick={() => {
            callDataSubmitApi();
          }}
        />
      </div>
    </>
  );
}

export default AddressDetails;
