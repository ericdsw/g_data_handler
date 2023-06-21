import { blue, green } from '@mui/material/colors';

export const styles = (theme) => ({
  conditionContainer: {
    padding: 16,
    width: '100%',
    // backgroundColor: theme.palette.background.paper
    // background: '#2b202a',
    // backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))'
  },
  interactionTypeText: {
    color: blue[400],
  },
  greenText: {
    color: green[400],
    fontWeight: 'bold',
  },
  summaryWrapper: {
    display: 'flex',
    width: '100%',
  },
});
