import { IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import { useSelector, useDispatch } from "react-redux";

import { toggleDarkMode } from "@/actions/appActions";

const DarkModeButton = () => {
  const { darkMode } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const handleToggleDarkMode = () => dispatch(toggleDarkMode());

  return (
    <Tooltip title="Mode">
      <IconButton
        size="large"
        color="inherith"
        onClick={handleToggleDarkMode}
      >
        {darkMode ? <BrightnessHighIcon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
}

export default DarkModeButton;