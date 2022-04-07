import React from "react";
import PropTypes from "prop-types";

import ServicesList from "../../../../ServicesList";
import { CardService } from "./CardService";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";

import "./initial.css";

/**
 *  Website services index. Contains clickable cards that redirect
 *  to the other BlAB services. Card data is loaded from the
 *  ServicesList javascript file.
 *
 *  @category Services
 *  @subcategory Initial
 *  @component
 */
const Initial = ({ setService }) => {
  return (
    <div className="initial">
      <motion.div className="title">
        <p>Blue Amazon Brain</p>
        <hr />
        <h2>BLAB</h2>
      </motion.div>
      <Grid container className="grid"
        sx={{
          width: {
            xs: "80vw", //mobile
            sm: "90vw", //tablet and above
          },
          maxWidth: {
            sm: "750px" //tablet and above
          }
        }}
      >
        {ServicesList.map((info) => {
          return (
            info.active === true && (
              <CardService
                key={info.name}
                setService={setService}
                info={info}
              />
            )
          );
        })}
      </Grid>
    </div>
  );
};

Initial.propTypes = {
  /** Setter for the website Body's service variable. */
  setService: PropTypes.func.isRequired,
};

export default Initial;
