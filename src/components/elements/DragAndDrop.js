import React, { useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import { useDropzone } from 'react-dropzone';

const useStyles = makeStyles(() => ({
  dragWrapper: {
    position: 'relative',
  },
  dragOverlay: {
    border: 'dashed grey 4px',
    backgroundColor: 'rgba(255,255,255,0.8)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  dragOverlayContent: {
    position: 'absolute',
    top: '50%',
    right: 0,
    left: 0,
    textAlign: 'center',
    color: 'grey',
    fontSize: 24,
  },
}));

const DragAndDrop = ({ children, handleDrop }) => {
  const classes = useStyles();
  const onDrop = useCallback(
    (acceptedFiles) => {
      handleDrop(acceptedFiles);
    },
    [handleDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={classes.dragWrapper} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive && (
        <div className={classes.dragOverlay}>
          <div className={classes.dragOverlayContent}>
            <div>Drop here :)</div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default DragAndDrop;
