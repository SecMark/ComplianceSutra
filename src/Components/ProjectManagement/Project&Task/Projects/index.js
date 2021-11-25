import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DeleteIconButton } from "../../components/Buttons";
import DeactivateAndDeleteModal from "../../components/Modals/DeactivateAndDeleteModal";
import ProjectManagementModal from "../../components/ProjectManagementModal";
import Project from "../../ProjectDesktop";
import BackDrop from "../../../../CommonModules/sharedComponents/Loader/BackDrop";
const Projects = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const projectsData = useSelector(
    (state) => state?.ProjectManagementReducer?.projectManagementData?.projects
  );
  const isLoading = useSelector(
    (state) => state?.ProjectManagementReducer?.projectManagementData?.isLoading
  );
  const isError = useSelector(
    (state) => state?.ProjectManagementReducer?.projectManagementData?.isError
  );

  useEffect(() => {
    console.log({ projectsData, isLoading });
    if (projectsData && projectsData?.length > 0) {
      setProjects(projectsData);
    }
  }, [projectsData, isLoading, isError]);
  return (
    <>
      <BackDrop isLoading={isLoading} />
      <DeactivateAndDeleteModal
        visible={isShowModal}
        onClose={() => setIsShowModal(false)}
      />
      {/* <button onClick={() => setIsShowModal(true)}>b</button> */}
      {!isLoading &&
        !isError &&
        projects &&
        projects.length > 0 &&
        projects.map((project) => {
          return <Project data={project} />;
        })}
    </>
  );
};

export default Projects;
