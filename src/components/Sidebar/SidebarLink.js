import React from 'react';

import { Box, Button, Divider } from "@material-ui/core"

import useStyles from "./styles"

const SidebarLink = ({ children, href }) => {
  
  const classes = useStyles()

  return (
  <>
    <Divider className={classes.divider} />
    <Button 
      href={href} 
      className={classes.button}
    >
      <Box paddingX={2} paddingY={1}>
        {children}
      </Box>
    </Button>
  </>
  );
}

export default SidebarLink;
