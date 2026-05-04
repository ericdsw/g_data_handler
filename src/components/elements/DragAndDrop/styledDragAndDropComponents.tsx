import { styled } from '@mui/material/styles';

export const DragOverlay = styled('div')({
  border: 'dashed grey 4px',
  backgroundColor: 'rgba(255,255,255,0.8)',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
});

export const DragOverlayContent = styled('div')({
  position: 'absolute',
  top: '50%',
  right: 0,
  left: 0,
  textAlign: 'center',
  color: 'grey',
  fontSize: 24,
});