import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { applicationName } from '@/globals';
import CutsceneFileNamesButton from './CutsceneFileNamesButton';
import PreloadedDialoguesButton from './PreloadedDialoguesButton';
import DarkModeButton from './DarkModeButton';
import HelpButton from './HelpButton';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  borderBottom: `3px solid ${theme.palette.primary.main}`
}));

type ApplicationBarProps = {
  handleToggle: () => void,
}

const ApplicationBar = ({ handleToggle }: ApplicationBarProps) => {
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='open drawer'
          sx={{ mr: 2 }}
          onClick={handleToggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap component='div'>{applicationName}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex' }}>
          <CutsceneFileNamesButton /> 
          <PreloadedDialoguesButton />
          <DarkModeButton />
          <HelpButton />
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default ApplicationBar;
