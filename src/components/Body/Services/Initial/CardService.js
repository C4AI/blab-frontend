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
import { createTheme } from "@material-ui/core/styles";

/*
 *  MUI theme used for resizing card pictures.
 *
 *  @category Services
 *  @subcategory Initial
 *  @constant
 *  @typee {object}
 */
const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0,
      xs: 360,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
    keys: ["xxs", "xs", "sm", "md", "lg", "xl"],
  },
});

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
    <Grid item sx={{ margin: "1em auto" }} xs={12} sm={6} md={4}>
      <div id={info.name} onClick={handleClick}>
        <Card
          className="root"
          classes={{ root: state.raised ? "cardhovered" : "" }}
          onMouseOver={() => setState({ raised: true, shadow: 3 })}
          onMouseOut={() => setState({ raised: false, shadow: 1 })}
          raised={state.raised}
          zdepth={state.shadow}
          sx={{
            width: {
              xs: "80vw",
              sm: "250px",
            },
            height: {
              xs: "130px",
              sm: "220px",
            },
            borderRadius: 5,
            margin: "auto",
            display: "flex",
            flexDirection: {
              xs: "row", //mobile
              sm: "column", //tablet and above
            },
          }}
        >
          <CardActionArea
            sx={{
              display: "flex",
              flexDirection: {
                xs: "row", //mobile
                sm: "column", //tablet and above
              },
            }}
          >
            <CardMedia
              theme={theme}
              sx={{
                width: {
                  xxs: "",
                  xs: "30%", //mobile
                  sm: "100%", //tablet and above
                },
                height: {
                  xxs: "",
                  xs: "100%", //mobile
                  sm: "90px", //tablet and above
                },
              }}
              component="img"
              image={require("../../../../images/" + info.image)}
              alt={info.imageAlt}
            />
            <CardContent
              sx={{
                height: {
                  sm: "130px",
                },
              }}
            >
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
