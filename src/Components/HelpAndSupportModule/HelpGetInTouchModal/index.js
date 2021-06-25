import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown"
import closeIcon from "../../../assets/Icons/closeIcon.png";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import MultiSelectCompanyDropdown from "../../../CommonModules/sharedComponents/Dropdown/HelpsupportDropDown"

function HelpGetInTouchModal(props) {

  const actionDispatch = useDispatch();



  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="border border-white p-4">
        <Modal.Title id="contained-modal-title-vcenter">

          <img
            src={closeIcon}
            alt="close-icon"
            onClick={props.onHide}
            style={{
              marginRight: "2rem",
              cursor: "pointer",
            }}
          />
          <div className="help-modalstitle">
            <span>Get in touch</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="border border-white">
        <div>
          <MultiSelectCompanyDropdown
            options={['']}
            lableTitle=""
            inputTitle="Choose catergory"
            dispatch={actionDispatch}
          />
        </div>
        <div>
          <textarea className="form-control" cols="10" rows="6" min="0" max="100"></textarea>
        </div>
        <div className="pt-4">
          <button className="buttonprimary">SEND</button>
        </div>
      </Modal.Body>
      <Modal.Footer className="border border-white">
        <div className="row" style={{ width: "100%" }}>
          <div className="col-5">
            <div class="help-devider-line"></div>
          </div>
          <div className="col-2" style={{ textAlign: "center" }}>
            <span className="help-divider-text">OR</span>
          </div>
          <div className="col-5">
            <div class="help-devider-line"></div>
          </div>
        </div>

        <div className="Contact-Us">Contact Us</div>

        <div style={{ width: "100%" }}>
          <p className="d-flex justify-content-center">
            <span className="Write-us-at">Write us at - </span>
            <span className="infosecmarkin">
              <a href="mailto:http://info@secmark.in">info@secmark.in </a>
            </span>
          </p>
          <p className="d-flex justify-content-center">
            <span className="Reach-us-at">Reach us at - </span>
            <span className="lightdetail">
              +91 9869265949
            </span>
          </p>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default HelpGetInTouchModal