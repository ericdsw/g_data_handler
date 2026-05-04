import { styled } from '@mui/material/styles';

const ToolbarSpace = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar
}));

export default ToolbarSpace;
