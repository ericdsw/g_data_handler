import { Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DragCapturer = styled(Paper)({
  padding: 16,
  marginTop: 24,
  cursor: 'pointer',
});

export const EmptyButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  marginBottom: 24
}));