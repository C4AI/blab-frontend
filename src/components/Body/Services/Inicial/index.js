import React from "react";
import PropTypes from 'prop-types';

import ServicesList from "../../../../ServicesList";
import { CardService } from "./CardService";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";

import makeStyles from "./styles";
import "./inicial.css"

/**
 *  Website services index. Contains clickable cards that redirect
 *  to the other BlAB services. Card data is loaded from the
 *  ServicesList javascript file.
 *
 *  @category Services
 *  @subcategory Inicial
 *  @component
 */
const Inicial = ({ setService }) => {
  const classes = makeStyles();
  return (
    <div className="inicial">
      <motion.div className="title">
        <p>Blue Amazon Brain</p>
        <hr />
        <h2>BLAB</h2>
      </motion.div>
      <Grid container className={classes.grid}>
      {
        ServicesList.map(
            info => {
                return info.active === true &&
                (<CardService
                    key={info.name}
                    setService={setService}
                    info={info}
                 />
                )
        })
      }
      </Grid>
    </div>
  );
};

Inicial.propTypes = {
    /** Setter for the website Body's service variable. */
    setService: PropTypes.func.isRequired
};

export default Inicial;
