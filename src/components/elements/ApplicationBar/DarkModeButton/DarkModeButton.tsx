import { IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';

import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleDarkMode } from "@/actions/appActions";

const DarkModeButton = () => {
  const darkMode = useAppSelector(state => state.app.darkMode);
  const dispatch = useAppDispatch();
  return (
    <Tooltip title="Mode">
      <IconButton
        size="large"
        color="inherit"
        onClick={() => dispatch(toggleDarkMode())}
      >
        {darkMode ? <BrightnessHighIcon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
}

export default DarkModeButton;
