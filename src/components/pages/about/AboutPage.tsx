import { Typography, Button, Link } from '@mui/material';

const AboutPage = () => {
  return (
    <>
      <Typography variant="body1">
        Copyright 2026,{' '}
        <Link color="secondary" href="https://github.com/ericdsw">
          Eric De Sedas
        </Link>
        , All rights reserved.
      </Typography>
      <br />
      <Typography variant="body2">
        Currently working at World Eater Games alongside{' '}
        <Link color="secondary" href="https://github.com/rnoriega31">
          rnoriega31
        </Link>
        , we area creating Bittersweet Birthday. Since our game revolves heavily
        on external formatted data, I created this tool to help ease a little
        bit some of the work that it takes to create and modify this
        information.
      </Typography>
      <br />
      <Typography variant="body2">
        Created using React and MaterialUI v9.0. References to additional
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
    </>
  );
};

export default AboutPage;
