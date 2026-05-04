import { ReactNode, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/material';

import { DragOverlay, DragOverlayContent } from './styledDragAndDropComponents';

type DragAndDropProps = {
  handleDrop: (acceptedFiles: File[]) => void,
  children: ReactNode | ReactNode[]
}

const DragAndDrop = ({
  handleDrop,
  children
}: DragAndDropProps) => {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleDrop(acceptedFiles);
  }, [handleDrop]);

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
