import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  SvgIcon,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../image/bg-img.png";
import { ReactComponent as Bubble } from "../image/bubble.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  bgWithGradient: {
    backgroundImage: `linear-gradient(to bottom, rgb(58 141 255 / 80%), rgb(134 185 255 / 80%)), url("${bgImage}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex", 
    alignItems: "center" 
  },
  bubble: {
    width: "67px",
    height: "67px",
    marginBottom: "20px"
  },
  introBox: {
    display: "flex", 
    alignItems: "center",
    flexDirection: "column",
    margin: "0 auto"
  },
  introText: {
    color: "white"
  },
  actionHelper: {
    color: theme.palette.secondary.main,
    fontSize: "14px",
    padding: "16px 0",
  },
  action: {
    width: "170px",
    height: "54px",
    margin: "0 0 0 30px",
    padding: "16px 33px 19px 34px",
    borderRadius: "5px",
    boxShadow: "0 2px 12px 0 rgba(74, 106, 149, 0.2)",
    color: theme.palette.primary.main,
  },
  formContainer:{
    display: "flex", 
    alignItems: "center" 
  },
  submitBtn: {
    width: "160px",
    height: "56px",
    padding: "18px 55px 18px 56px",
    borderRadius: "3px",
    backgroundColor: theme.palette.primary.main,
    color: "white"
  }
}));

const GreetLayout = (props) => {
  const classes = useStyles();
  return (
    <Grid container component="main" spacing={0} className={classes.root}>
      <Grid item xs={12} md={5} className={classes.bgWithGradient}>
          <Box className={classes.introBox} py={5}>
            <SvgIcon viewBox="0 0 67 67" className={classes.bubble}>
              <Bubble />
            </SvgIcon>
            <Box my={2} />
            <Typography
              variant="h5"
              component="h1"
              className={classes.introText}>
                Converse with anyone
            </Typography>
            <Typography
              variant="h5"
              component="h1"
              className={classes.introText}>
                with any language
            </Typography>
          </Box>
      </Grid>
      <Grid item xs={12} md={7} >
        <Grid container   spacing={0} >
          <Grid item xs={12}>
            <Box p={3}>
              <Grid container justify="flex-end">
                <Typography
                  variant="subtitle1"
                  component="h3"
                  className={classes.actionHelper}>
                  {props.actionHelper}
                </Typography>
                <Button
                  onClick={props.onClick}
                  className={classes.action}>
                    {props.actionLabel}
                </Button>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid
                container
                spacing={0}
                align="center"
                justify="center"
                direction="column"
              >
                <Box display={{ xs: 'none', md: 'block' }} my={10}/>
                <Box className={classes.formBox}>
                  <Container maxWidth="sm">
                    <Typography align="left" variant="h5" component="h5">{props.title}</Typography>
                    <Box my={1} />
                    <form onSubmit={props.handleFormSubmit}>
                      {props.children}
                      <Box my={5}>
                        <Button 
                          className={classes.submitBtn} 
                          type="submit" variant="contained" size="large">
                          {props.submitBtnLabel}
                        </Button>
                      </Box>
                    </form>
                  </Container>
                </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GreetLayout;
