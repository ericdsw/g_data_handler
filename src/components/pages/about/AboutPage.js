import React from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.secondary.main,
  },
}));

const AboutPage = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="body1">
        Copyright 2019-2021,{" "}
        <a href="https://github.com/ericdsw" className={classes.link}>
          Eric De Sedas
        </a>
        , All rights reserved.
      </Typography>
      <br />
      <Typography variant="body2">
        Currently working at World Eater Games alongside{" "}
        <a className={classes.link} href="https://github.com/rnoriega31">
          rnoriega31
        </a>
        , we area creating a still-unnamed boss rush adventure game. Since our
        game revolves heavily on external formatted data, I created this tool to
        help ease a little bit some of the work that it takes to create and
        modify this information.
      </Typography>
      <br />
      <Typography variant="body2">
        Created using React and MaterialUI v4.0. References to additional
        libraries used can be found in the project's repository.
      </Typography>
      <br />
      <br />
      <Button
        href="https://github.com/ericdsw/g_data_handler"
        color="primary"
        variant="contained"
      >
        Visit Project Repository
      </Button>
    </React.Fragment>
  );
};

export default AboutPage;
