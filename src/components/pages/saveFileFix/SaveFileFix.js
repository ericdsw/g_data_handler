import React, { useState } from 'react';
import { Button, Grid, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { downloadJSON } from '../../../functions';
import { VisuallyHiddenInput } from '../../elements';

const SaveFileFix = () => {
  const [sourceFileName, setSourceFileName] = useState('');
  const [sourceFileContent, setSourceFileContent] = useState({});

  const [fixFileName, setFixFileName] = useState('');
  const [fixFileContent, setFixFileContent] = useState({});

  const download = () => {
    const result = fixFileContent;

    // Remove seeded storyline data incorrectly placed on the file's root
    if ('storyline_data' in result) {
      const dataKeys = Object.keys(result['storyline_data']);
      for (let i = 0; i < dataKeys.length; i++) {
        const curDataKey = dataKeys[i];
        if (!['Default', 'Violent', 'End'].includes(curDataKey)) {
          delete result['storyline_data'][curDataKey];
        }
      }
    }

    // Migrate player data
    if ('player_data' in result) {
      const defaultData = sourceFileContent['player_data']['Default'];
      const otherRuns = Object.keys(result['player_data']).filter(
        (key) => key !== 'Default'
      );

      for (let i = 0; i < otherRuns.length; i++) {
        const currentRunName = otherRuns[i];

        // Past key items
        const pastData = defaultData['inventory']['past']['key_items'];
        const alreadyObtainedItems = result['player_data'][currentRunName][
          'inventory'
        ]['past']['key_items'].map((itemData) => itemData.item_id);
        for (let k = 0; k < pastData.length; k++) {
          if (!alreadyObtainedItems.includes(pastData[k].item_id)) {
            result['player_data'][currentRunName]['inventory']['past'][
              'key_items'
            ].push(pastData[k]);
            console.log(`added ${pastData[k].item_id} to the inventory`);
          }
        }

        // Past delivered items
        const pastDeliveredData = defaultData['delivered_inventory']['past'];
        for (let k = 0; k < pastDeliveredData.length; k++) {
          if (
            !result['player_data'][currentRunName]['delivered_inventory'][
              'past'
            ].includes(pastDeliveredData[k])
          ) {
            result['player_data'][currentRunName]['delivered_inventory'][
              'past'
            ].push(pastDeliveredData[k]);
            console.log(
              `added ${pastDeliveredData[k]} to the delivered inventory`
            );
          }
        }

        // Memories
        const previousMemories = defaultData['memories'];
        const prevObtainedMemories = previousMemories['memories'];
        const prevAvailableMemoryPoints =
          previousMemories['available_memory_points'];

        for (let k = 0; k < prevObtainedMemories.length; k++) {
          if (
            !result['player_data'][currentRunName]['memories'][
              'memories'
            ].includes(prevObtainedMemories[k])
          ) {
            result['player_data'][currentRunName]['memories']['memories'].push(
              prevObtainedMemories[k]
            );
            console.log(`Added the memory: ${prevObtainedMemories[k]}`);
          }
        }

        if (
          prevAvailableMemoryPoints >
          result['player_data'][currentRunName]['memories'][
            'available_memory_points'
          ]
        ) {
          result['player_data'][currentRunName]['memories'][
            'available_memory_points'
          ] = prevAvailableMemoryPoints;
          console.log(
            `Updated available memory points to ${prevAvailableMemoryPoints} (new value was lower...)`
          );
        }

        // Storyline progression
        const prevStorylineData =
          sourceFileContent['storyline_data']['Default'];
        const prevStorylineNames = Object.keys(prevStorylineData);
        const curStorylineNames = Object.keys(
          result['storyline_data'][currentRunName]
        );

        for (let k = 0; k < prevStorylineNames.length; k++) {
          if (!curStorylineNames.includes(prevStorylineNames[k])) {
            result['storyline_data'][currentRunName][prevStorylineNames[k]] =
              prevStorylineData[prevStorylineNames[k]];
            console.log(
              `Passes data from non existing storyline ${prevStorylineNames[k]} to the fixed file`
            );
          } else {
            const curProgression =
              result['storyline_data'][currentRunName][prevStorylineNames[k]][
                'current_step'
              ];
            const prevProgression =
              prevStorylineData[prevStorylineNames[k]]['current_step'];
            if (
              curProgression.includes('initial') &&
              !prevProgression.includes('initial')
            ) {
              result['storyline_data'][currentRunName][prevStorylineNames[k]] =
                prevStorylineData[prevStorylineNames[k]];
              console.log(
                `Overwrite storyline data for ${
                  prevStorylineNames[k]
                } with a newer step (${curProgression} => ${
                  prevStorylineData[prevStorylineNames[k]]['current_step']
                })`
              );
            }
          }
        }

        // Map Data
        const prevMapData = sourceFileContent['map_data']['Default'];
        const prevMapNames = Object.keys(prevMapData);
        for (let k = 0; k < prevMapNames.length; k++) {
          const mapName = prevMapNames[k];

          if (!(mapName in result['map_data'][currentRunName])) {
            result['map_data'][currentRunName][mapName] = {};
          }

          if (mapName.includes('Village')) {
            const mapProperties = prevMapData[mapName];
            const mapPropertyNames = Object.keys(mapProperties);
            for (let u = 0; u < mapPropertyNames.length; u++) {
              result['map_data'][currentRunName][mapName][mapPropertyNames[u]] =
                mapProperties[mapPropertyNames[u]];
              console.log(
                `migrated map property ${
                  mapPropertyNames[u]
                } on the map ${mapName} with value ${
                  mapProperties[mapPropertyNames[u]]
                }`
              );
            }
          }
        }

        // NPC Data
      }
    }

    downloadJSON(fixFileName, result);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                {`source: ${sourceFileName}` || `Upload Base File`}
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => {
                    const fileReader = new FileReader();
                    const fileName = e.target.files[0].name;
                    fileReader.readAsText(e.target.files[0], 'UTF-8');
                    fileReader.onload = (e) => {
                      setSourceFileName(fileName);
                      setSourceFileContent(JSON.parse(e.target.result));
                    };
                  }}
                />
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                onClick={() => {
                  setSourceFileName('');
                  setSourceFileContent({});
                }}
              >
                clear
              </Button>
            </Grid>
          </Grid>

          <Paper style={{ padding: 12, marginTop: 16 }}>
            <pre style={{ fontSize: 12, maxHeight: 600, overflowY: 'scroll' }}>
              {Object.keys(sourceFileContent).length > 0 &&
                JSON.stringify(sourceFileContent, null, 2)}
              {Object.keys(sourceFileContent).length <= 0 && `No file selected`}
            </pre>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                {`fix: ${fixFileName}` || `Upload File To Fix`}
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => {
                    const fileReader = new FileReader();
                    const fileName = e.target.files[0].name;
                    fileReader.readAsText(e.target.files[0], 'UTF-8');
                    fileReader.onload = (e) => {
                      setFixFileName(fileName);
                      setFixFileContent(JSON.parse(e.target.result));
                    };
                  }}
                />
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                onClick={() => {
                  setFixFileName('');
                  setFixFileContent({});
                }}
              >
                clear
              </Button>
            </Grid>
          </Grid>

          <Paper style={{ padding: 12, marginTop: 16 }}>
            <pre style={{ fontSize: 12, maxHeight: 600, overflowY: 'scroll' }}>
              {Object.keys(fixFileContent).length > 0 &&
                JSON.stringify(fixFileContent, null, 2)}
              {Object.keys(fixFileContent).length <= 0 && `No file selected`}
            </pre>
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Button variant="outlined" onClick={() => download()}>
            Download Fixed File
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SaveFileFix;
