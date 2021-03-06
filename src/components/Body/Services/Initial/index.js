import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ServicesList from "../../../../ServicesList";
import { CardService } from "./CardService";
import { Container, Grid, Typography, Divider } from "@mui/material";

import "./initial.css";

/**
 * Empty grid item. Used for grid alignment.
 *
 * @category Services
 * @subcategory Initial
 * @component
 */

function FillerGridItem(){
  return (
    <Grid item 
      sx={{
        margin: "1em auto",
      }}
      xs={12} sm={6} md={4}
    />
  )
}

/**
 * Fills grid container with empty grid items to align cards to the left.
 *
 * @category Services
 * @subcategory Initial
 * @function
 */

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
  /* This calculates the number of columns to display according to screen size.
     It needs to match the number of grid items per line in the CardService component.

     Currently, phones will display a single column, tablets and small computers will
     display two, and larger devices will display a maximum of three.
  */
  var numOfActiveServices = 0;
  var initialNumOfColumns = 0;
  if(window.innerWidth < 600)
    initialNumOfColumns = 1;
  else if(window.innerWidth < 900)
    initialNumOfColumns = 2;
  else
    initialNumOfColumns = 3;

  const [numOfColumns, setNumOfColumns] = useState(initialNumOfColumns);
  
  /* Whenever the screen is resized, the number of columns is recalculated. */
  const handleResize = () => {
    if(window.innerWidth < 600)
      setNumOfColumns(1);
    else if(window.innerWidth < 900)
      setNumOfColumns(2);
    else
      setNumOfColumns(3);
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })
  
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
              xs: "50px", //mobile
              sm: "10vh", //tablet and above
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
          marginTop: {
            xs: "50px", //mobile
            sm: "10vh", //tablet and above
          }
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
