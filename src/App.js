import React, { useState } from 'react';
import { Slideshow } from "./components/slideShow"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer";
import './App.css';

import { motion } from "framer-motion";

import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  makeStyles,
  withStyles, 
  Tooltip
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu';
import Zoom from '@material-ui/core/Zoom';


const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    position: 'absolute',
    width: '100%',
    // height: 'auto',
    top: 0,
    left: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: 'rgba(255, 255, 255, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: '.9em',
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  },
}))(Tooltip);

const longText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;

function App() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false); 
  };

  return (
    <div className="App">
      <CssBaseline />
      <div className="App-header">
        <Box className={classes.root} visibility={open ? "hidden" : "visible"}>
          <AppBar style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
            <Toolbar>
              <Box display={{ xs: 'block', md: 'none'}} m={1}>
                <IconButton 
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerOpen}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Typography variant="h6"  className="name">
                  <span className="nameChildOne">Blue Amazonia Brain</span>
                  <motion.span whileHover={{scale: 1.2}}>
                    <a 
                      href="http://c4ai.inova.usp.br/" 
                      className="nameChildTwo" 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      by C4AI
                    </a>
                  </motion.span>
              </Typography>
              <LightTooltip TransitionComponent={Zoom} title={longText}  placement="bottom-start">
                <Box display={{xs: 'none', md: 'block'}} m={1}>
                  <Button style={{color: '#FFF', fontWeight: 'bold', fontSize: '.6em'}}>Sobre</Button>
                </Box>
              </LightTooltip>
            </Toolbar>
          </AppBar>
          <Sidebar open={open} handleDrawerClose={handleDrawerClose} />  
        </Box>
        <Slideshow/>
      </div>
      <div className="App-body">

      </div>
      {/* <Container maxWidth="md">
        <Paper elevation={3} style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
          <span>teste</span>
          <span>teste</span>
          <span>teste</span>
          <span>teste</span>
        </Paper>
      </Container> */}
      <Footer />
    </div>
  );
}

export default App;
