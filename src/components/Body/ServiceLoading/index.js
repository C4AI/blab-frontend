import React from "react";
import { Box } from "@mui/material";
import { TailSpin } from "react-loader-spinner";

const ServiceLoading = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <TailSpin color="#FFFFFF" height={80} width={80}/>
    </Box>
  )
}

export default ServiceLoading;
