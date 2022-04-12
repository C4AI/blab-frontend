import React from "react";
import PropTypes from "prop-types";

import ServicesList from "../../../../ServicesList";
import { CardService } from "./CardService";
import { Container, Grid, Typography, Divider } from "@mui/material";

import "./initial.css";

function FillerGridItem(){
  return (
    <Grid item 
    sx={{
      margin: "auto",
      width: {
        xs: "80vw",
        sm: "250px",
      },
    }}/>
  )
}

function FillGrid(props){
  const numOfItems = props.numOfItems;
  const numOfColumns = props.numOfColumns;
  const Filler = [];
  if (numOfItems % numOfColumns != 0) {
    const extraItems = numOfColumns - numOfItems % numOfColumns ;
    for (var i = 0; i < extraItems; i++) {
      Filler[i] = <FillerGridItem key={'FillerGridItem_' + i}/>;
    }
  }
  return Filler
}

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
  var numOfActiveServices = 0;
  var numOfColumns = 3;
  return (
    <div className="initial">
      <Container className="title">
        <Typography
          variant="h6"
          sx={{
            textTransform: "uppercase",
            fontSize: "1rem",
            fontWeight: "bold",
            marginTop: {
              xs: "25px", //mobile
              sm: "50px", //tablet and above
            },
            paddingBottom: {
              xs: "0.5rem",
              sm: "1rem",
            },
            letterSpacing: "0.25rem",
          }}
        >
          Blue Amazon Brain
        </Typography>
        <Divider
          sx={{
            backgroundColor: "white",
            width: "180px",
            margin: "auto",
          }}
        />
        <Typography variant="h2" sx={{}}>
          BLAB
        </Typography>
      </Container>
      <Grid
        container
        className="grid"
        sx={{
          width: "90vw",
          maxWidth: {
            sm: "1000px", //tablet and above
          },
        }}
      >
        {
        ServicesList.map((info) => {
            if (info.active === true) {
              numOfActiveServices += 1;
              return (
              <CardService
                key={info.name}
                setService={setService}
                info={info}
              />
              )}
        })}
        <FillGrid numOfItems={numOfActiveServices} numOfColumns={numOfColumns}/>
      </Grid>
    </div>
  );
};



FillGrid.propTypes = {
  /** Setter for the website Body's service variable. */
  numOfItems: PropTypes.number.isRequired,
  numOfColumns: PropTypes.number.isRequired,
};
Initial.propTypes = {
  /** Setter for the website Body's service variable. */
  setService: PropTypes.func.isRequired,
};

export default Initial;
