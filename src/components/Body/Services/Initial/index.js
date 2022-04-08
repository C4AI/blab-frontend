import React from "react";
import PropTypes from "prop-types";

import ServicesList from "../../../../ServicesList";
import { CardService } from "./CardService";
import { Container, Grid, Typography, Divider } from "@mui/material";

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
      <Container className="title">
        <Typography variant="h6" 
          sx={{
            textTransform: "uppercase",
            fontSize: "1rem",
            fontWeight: "bold",
            marginTop: {
              xs: "25px", //mobile
              sm: "50px"  //tablet and above
            },
            paddingBottom: {
              xs: "0.5rem",
              sm: "1rem",
            },
            letterSpacing: "0.25rem"
          }}
        >
          Blue Amazon Brain
        </Typography>
        <Divider
          sx={{
            backgroundColor: "white",
            width: "180px",
            margin: "auto"
          }}
        />
        <Typography variant="h2"
          sx={{
          }}
        >
          BLAB
        </Typography>
      </Container>
      <Grid container className="grid"
        sx={{
          width: "90vw",
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
