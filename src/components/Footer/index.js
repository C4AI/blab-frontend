import React from "react";

import { Box, Button, Divider, Grid, IconButton } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";

import "./Footer.css";

import logo_usp from "../../images/logo_usp.png";
import logo_ibm from "../../images/logo_ibm.png";
import logo_fapesp from "../../images/logo_fapesp.png";

import { useTranslation } from "react-i18next";

/**
 * Global website footer.
 *
 * @category Basic
 * @component
 */
const Footer = () => {
  const { t } = useTranslation();
  const fbLabel = t("facebookLabel");
  const liLabel = t("linkedInLabel");
  const ytLabel = t("youtubeLabel");
  const ttLabel = t("twitterLabel");
  return (
    <footer className="footer">
      <Divider />
      <Box padding={5}>
        <Grid container justifyContent="space-evenly">
          <Grid item>
            <span>&copy; C4AI - Center for Artificial Intelligence 2021</span>
          </Grid>
          <Grid item>
            <IconButton href="https://www.facebook.com/groups/C4AI.USP" aria-label={fbLabel}>
              <FacebookIcon className="footer.icon" fontSize="large" />
            </IconButton>
            <IconButton href="https://www.linkedin.com/groups/8980226/" aria-label={liLabel}>
              <LinkedInIcon className="footer.icon" fontSize="large" />
            </IconButton>
            <IconButton href="https://www.youtube.com/channel/UCBg_eunUlxU5b95vyg_mxww" aria-label={ytLabel}>
              <YouTubeIcon className="footer.icon" fontSize="large" />
            </IconButton>
            <IconButton href="https://twitter.com/C4AI1" aria-label={ttLabel}>
              <TwitterIcon className="footer.icon" fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item>
            <Button href="#privacy_policy">Privacy Policy</Button>
            <Button href="#terms_of_use">Terms of Use</Button>
          </Grid>
        </Grid>
      </Box>
      <Box marginBottom={2}>
        <Button href="https://www5.usp.br/">
          <img src={logo_usp} height="65" alt="USP" />
        </Button>
        <Button href="https://www.ibm.com/br-pt">
          <img src={logo_ibm} height="65" alt="IBM" />
        </Button>
        <Button href="https://fapesp.br/">
          <img src={logo_fapesp} height="65" alt="FAPESP" />
        </Button>
      </Box>
    </footer>
  );
};

export default Footer;
