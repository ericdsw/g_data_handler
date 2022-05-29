import { blue } from '@mui/material/colors';
import EmoteBackground from '../../../../images/emote_background.png';

export const styles = (theme) => ({
  emoteContainer: {
    backgroundColor: theme.palette.messageBackground,
    borderBottom: '1px solid #666',
    padding: theme.spacing(2),
  },
  emoteImageBackground: {
    display: 'inline-block',
    width: 48,
    height: 48,
    padding: 8,
    margin: 0,
    background: `url(${EmoteBackground})`,
    backgroundSize: '48px 48px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    textAlign: 'center',
  },
  emoteImage: {
    width: 24,
    height: 24,
  },
  emoteTarget: {
    color: blue[200],
    fontWeight: 'bold',
  },
  toolbarButton: {
    color: '#fff',
  },
});
