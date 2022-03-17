import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Grid, Card, CardContent, CardMedia, CardActionArea, Typography } from '@mui/material';
import makeStyles from "./styles";

export const CardService = ({ setService, info }) => {
    const classes = makeStyles();
    const [state, setState] = useState({
    raised:false,
    shadow:1,
    })

    const handleClick = (event) => {
      setService(event.currentTarget.id);
    };

    return(
        <Grid item xs={6} sx={{marginTop:'30px'}}>
            <div id={info.name} onClick={handleClick}>
                <Card 
                    className={classes.root}
                    classes={{root: state.raised ? classes.cardHovered : ""}}
                    onMouseOver={()=>setState({ raised: true, shadow:3})} 
                    onMouseOut={()=>setState({ raised:false, shadow:1 })} 
                    raised={state.raised} zdepth={state.shadow}
                    sx={{ 
                        width: '250px',
                        height: '220px',
                        margin: '1em 1em',
                        borderRadius: 5
                    }}
                >
                    <CardActionArea>
                    <CardMedia
                        component = "img"
                        height = "90px"
                        image = {require("../../../../images/" + info.image)}
                        alt = {info.imageAlt}
                        />
                        <CardContent>
                            <Typography     gutterBottom        variant="h5" component="div">
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
    )
}

CardService.propTypes = {
    setService: PropTypes.func.isRequired,
    info: PropTypes.object.isRequired
};
