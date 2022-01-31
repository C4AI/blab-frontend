import {
  makeStyles,
  withStyles, 
  Tooltip
} from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: '100%',
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

export const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: 'rgba(255, 255, 255, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: '.9em',
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  },
}))(Tooltip);
