import React from 'react';

import { Box, Drawer, IconButton } from "@material-ui/core"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import SidebarLink from './SidebarLink';

const Sidebar = ({ open, handleDrawerClose }) => {

  const links = [
    {label: "Início", href: "/"},
    {label: "Serviços", href: "servicos"},
    {label: "Equipes", href: "equipes"},
    {label: "Wiki", href: ""}
  ]

  return (
    <Drawer 
      open={open} 
      onBackdropClick={handleDrawerClose}
      PaperProps={{
        style: {
          backgroundColor: "rgb(0, 0, 0, 0.2)"
        }
      }}
      ModalProps={{
        BackdropProps: {invisible: true}
      }}
    >
      <Box textAlign="right">
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon style={{color: "white"}} />
        </IconButton>
      </Box>
      {links.map(link => <SidebarLink href={link.href} key={link.href}>{link.label}</SidebarLink>)}
    </Drawer> 
  );
}

export default Sidebar;
