import { useState, useCallback, useMemo } from 'react';
import { Button, Divider, Paper, Grid, Typography } from '@mui/material';
import DragAndDrop from './DragAndDrop';
import { styled } from '@mui/material/styles';

const DragCapturer = styled(Paper)(() => ({
  padding: 16,
  marginTop: 24,
  cursor: 'pointer',
}));

const EmptyButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  marginBottom: 24
}))

const DragJsonFileManager = ({
  buttonString,
  dragString,
  handleEmpty,
  handleUpdateFromFile,
  additionalActions = [],
}) => {

  const [loading, toggleLoading] = useState(false);

  const handleDrop = useCallback(
    (files) => {
      toggleLoading(true);
      handleUpdateFromFile(files[0]);
    },
    [toggleLoading, handleUpdateFromFile]
  );

  const additionalButtons = useMemo(
    () => (
      <>
        {additionalActions.map((actionData) => (
          <EmptyButton
            key={actionData.title}
            variant="contained"
            color="primary"
            onClick={actionData.action}
          >
            {actionData.title}
          </EmptyButton>
        ))}
      </>
    ),
    [additionalActions]
  );

  return (
    <div>
      <EmptyButton
        variant="contained"
        color="primary"
        onClick={() => handleEmpty()}
      >
        {buttonString}
      </EmptyButton>
      {additionalButtons}
      <Divider />
      <DragAndDrop handleDrop={handleDrop}>
        <DragCapturer elevation={1}>
          <Grid
            container
            direction="row"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              minHeight: 300
            }}>
            <Grid size="grow">
              <Typography color="textSecondary" align="center" variant="h4">
                {loading && <>Loading...</>}
                {!loading && dragString}
              </Typography>
            </Grid>
          </Grid>
        </DragCapturer>
      </DragAndDrop>
    </div>
  );
};

export default DragJsonFileManager;
