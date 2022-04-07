import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";

/*
 *  Card template. Draws picture and text information from an "info" prop.
 *
 *  @component
 */
export const CardService = ({ setService, info }) => {
  const [state, setState] = useState({
    raised: false,
    shadow: 1,
  });

  const handleClick = (event) => {
    setService(event.currentTarget.id);
  };

  return (
    <Grid item xs={10} sm={6} sx={ { margin: "1em auto" } }>
      <div id={info.name} onClick={handleClick}>
        <Card
          className="root"
          classes={{ root: state.raised ? "cardhovered" : "" }}
          onMouseOver={() => setState({ raised: true, shadow: 3 })}
          onMouseOut={() => setState({ raised: false, shadow: 1 })}
          raised={state.raised}
          zdepth={state.shadow}
          sx={{
            width: "250px",
            height: "220px",
            borderRadius: 5,
            margin: "auto",
            display: "flex",
            flexDirection: {
              xs: "row", //mobile
              sm: "column", //tablet and above
            },
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="90px"
              image={require("../../../../images/" + info.image)}
              alt={info.imageAlt}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {info.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {info.text}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Grid>
  );
};

CardService.propTypes = {
  setService: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
};
