import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const DragOverlay = styled('div')(() => ({
  border: 'dashed grey 4px',
  backgroundColor: 'rgba(255,255,255,0.8)',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
}));

const DragOverlayContent = styled('div')(() => ({
  position: 'absolute',
  top: '50%',
  right: 0,
  left: 0,
  textAlign: 'center',
  color: 'grey',
  fontSize: 24,
}));

const DragAndDrop = ({ children, handleDrop }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      handleDrop(acceptedFiles);
    },
    [handleDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box sx={{ position: 'relative' }} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive && (
        <DragOverlay>
          <DragOverlayContent>
            <div>Drop here :)</div>
          </DragOverlayContent>
        </DragOverlay>
      )}
      {children}
    </Box>
  );
};

export default DragAndDrop;
