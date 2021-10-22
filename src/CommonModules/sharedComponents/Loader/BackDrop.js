import React from "react";

import Backdrop from "@mui/material/Backdrop";
import Loading from ".";

const BackDrop = ({ isLoading }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <Loading />
    </Backdrop>
  );
};

export default BackDrop;
