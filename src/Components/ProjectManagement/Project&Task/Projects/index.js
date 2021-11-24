import React, { useState } from "react";
import { DeleteIconButton } from "../../components/Buttons";
import DeactivateAndDeleteModal from "../../components/Modals/DeactivateAndDeleteModal";
import ProjectManagementModal from "../../components/ProjectManagementModal";
import Project from "../../ProjectDesktop";

const Projects = () => {
  const [isShowModal, setIsShowModal] = useState(true);
  return (
    <>
      <DeactivateAndDeleteModal
        visible={isShowModal}
        onClose={() => setIsShowModal(false)}
      />
      <button onClick={() => setIsShowModal(true)}>b</button>
      <Project />
      <Project />
      <Project />
    </>
  );
};

export default Projects;
