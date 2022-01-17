import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./style.module.scss";
import Text from "../../../components/Text/Text";

export default function PreviewAllocation({
  handleOpen,
  handleClose,
  open,
  setOpen,
  data,
}) {
  //   const [open, setOpen] = React.useState(false);
  console.log("data", data);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}
        <div className={styles.box}>
          {data?.map((item) => (
            <div>
              <Text heading="h1" text={item.section}/>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Question No</th>
                    <th scope="col">Questions</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Assign To</th>
                  </tr>
                </thead>
                <tbody>
                    {item?.questions?.map((items,index)=>(
                       <tr>
                       <th scope="row">{index+1}</th>
                       <td>{items.question}</td>
                       <td>{items.deadlineDay.length>0? items.deadlineDay :"-"}</td>
                       <td>{items.assignTo.length>0? items.assignTo :"-"}</td>
                     </tr>
                    ))}
                  
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
