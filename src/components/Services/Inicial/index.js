import React from "react";
import PropTypes from 'prop-types';

import ServicesList from "../../../ServicesList";
import { CardService } from "./CardService";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";

import makeStyles from "./styles";
import "./inicial.css"

export const Inicial = ({ setService }) => {
  const classes = makeStyles();
  return (
    <div className="inicial">
      <motion.div className="title">
        <p>Blue Amazonia Project</p>
        <hr />
        <h2>BLAB</h2>
      </motion.div>
      <Grid container className={classes.grid}>
      {
        ServicesList.map(
            info => {
                return info.active === true ?
                (<CardService
                    setService={setService}
                    info={info}
                 />
                )
                :
                <></>
        })
      }
      </Grid>
    </div>
  );
};

Inicial.propTypes = {
    setService: PropTypes.func.isRequired
};
