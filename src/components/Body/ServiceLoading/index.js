import React from "react";
import { Box } from "@mui/material";
import { Rings } from "react-loader-spinner";

const ServiceLoading = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center"
      sx={{
        position: "absolute",
        objectPosition: "center center",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, 0)",
      }}
    >
      <Rings color="#FFFFFF" height={80} width={80}/>
    </Box>
  )
}

export default ServiceLoading;
