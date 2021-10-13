import React, { useState } from "react";
import AddProject from "./AddProjectModal";

function AddNewProject() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(true)}>Add Project</button>
      <AddProject onClose={()=>setShow(false)} show={show} />
    </div>
  );
}

export default AddNewProject;
