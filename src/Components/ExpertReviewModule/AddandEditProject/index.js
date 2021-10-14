import React, { useState, useEffect } from "react";
import AddProject from "./AddProjectModal";
import AddProjectMobile from "./AddProjectMobile";

function AddNewProject() {
  const [show, setShow] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  return (
    <div>
      <button onClick={() => setShow(true)}>Add Project</button>

      {width <= 768 ? (
        <AddProjectMobile />
      ) : (
        <AddProject onClose={() => setShow(false)} show={show} />
      )}
    </div>
  );
}

export default AddNewProject;
