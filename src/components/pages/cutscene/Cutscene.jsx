import { useMemo } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Tooltip,
  Paper,
  Box
} from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { styled } from '@mui/material/styles';

import CutsceneRowContainer from './CutsceneRowContainer';

const CutsceneRoot = styled(Grid)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  paddingTop: theme.spacing(2),
  [theme.breakpoints.down('lg')]: {
    paddingLeft: 0,
    paddingRight: 0
  }
}))

const Cutscene = ({
  cutscene,
  fileName,
  hideBars,
  handleFileNameChange,
  handleAddRow,
  handleShouldHideBars,
  handleDragEnd,
}) => {
  const cutsceneRows = useMemo(() => cutscene.cutsceneRows, [cutscene]);

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <CutsceneRoot container spacing={2} sx={{
          alignItems: "center"
        }}>
          <Grid size={{ xs: 12, md: 10 }}>
            <TextField
              id="file_name"
              label="File Name"
              fullWidth
              value={fileName}
              variant="outlined"
              margin="normal"
              onChange={(e) => handleFileNameChange(e.target.value)}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 2
            }}>
            <Tooltip title="If true, top and bottom black bars will not show">
              <FormControlLabel
                label="Hide black bars"
                control={
                  <Switch
                    onChange={(e) => {
                      handleShouldHideBars(e.target.checked);
                    }}
                    checked={hideBars}
                    value={hideBars}
                  />
                }
              />
            </Tooltip>
          </Grid>

          <Grid container spacing={2} size={12}>
            {/* Event List */}
            <Grid size={12}>
              <Droppable droppableId={cutscene.id} type="cutsceneRow">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {cutsceneRows.length === 0 && (
                      <Paper>
                        <Typography
                          variant="h5"
                          color="textSecondary"
                          align="center"
                          sx={{ padding: 32, width: '100%' }}
                        >
                          The cutscene is empty
                        </Typography>
                      </Paper>
                    )}
                    {cutsceneRows.map((cutsceneRowId, index) => (
                      <CutsceneRowContainer
                        key={cutsceneRowId}
                        rowId={cutsceneRowId}
                        rowNumber={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid>
            {/* Add new row button */}
            <Grid size={12}>
              <Grid container sx={{
                justifyContent: "center"
              }}>
                <Button color="primary" onClick={() => handleAddRow()}>
                  Add Row
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CutsceneRoot>
      </DragDropContext>
      <Box sx={{ height: 150 }} />
    </>
  );
};

export default Cutscene;
