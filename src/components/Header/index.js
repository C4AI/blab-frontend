import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Inicial } from "../Pages/inicial";
import { Servicos } from "../Pages/servicos";
import { Equipes } from "../Pages/equipes";

import Sidebar from "../Sidebar"

import { motion } from "framer-motion";
import MenuIcon from '@material-ui/icons/Menu';
import Zoom from '@material-ui/core/Zoom';

import "./Header.css";
import { useStyles, LightTooltip } from "./styles.js"

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from '@material-ui/core'

const longText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;

function Header() {
	const [open, setOpen] = useState(false);
	const handleDrawerOpen = () => {
	  setOpen(true);
	};

	const handleDrawerClose = () => {
      setOpen(false); 
	};

	const classes = useStyles();

    return (
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
        <Router>
          <Routes>
            <Route exact path='/' element={<Inicial/>}/>
            <Route exact path='/servicos' element={<Servicos/>}/>
            <Route exact path='/equipes' element={<Equipes/>}/>
          </Routes>
        </Router>
      </div>
    );
}

export default Header;
