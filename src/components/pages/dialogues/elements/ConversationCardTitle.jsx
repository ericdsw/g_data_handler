import { Icon, Typography, Grid } from '@mui/material';

const ConversationCardTitle = ({ text, icon, color }) => {
  return (
    <Grid container sx={(theme) => ({
      alignItems: "center",
      color: theme.palette.text.primary
    })}>
      {icon && <Icon sx={theme => ({ marginRight: theme.spacing(1) })}>{icon}</Icon>}
      <Typography variant="h5">{text}</Typography>
    </Grid>
  );
};

export default ConversationCardTitle;
