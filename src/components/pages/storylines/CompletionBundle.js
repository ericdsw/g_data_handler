import React, { useState, useMemo, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Tooltip,
  IconButton,
  Icon,
} from '@mui/material';
import { useSelector } from 'react-redux';

import CompleteConditionContainer from '../../containers/CompleteConditionContainer';
import CompleteConditionForm from './forms/CompleteConditionForm';
import CompletionBundleForm from './forms/CompletionBundleForm';
import {
  GenericDialogue,
  ConfirmationDialogue,
  MenuIconButton,
} from '../../elements';
import { completionInputSchema } from '../../../globals';
import { useDialogueManager } from '../../../hooks';

import { styles } from './styles/CompletionBundleStyle';

const useStyles = makeStyles(styles);

const CompletionBundle = ({
  completionBundle,
  handleCreateCondition,
  handleEditBundle,
  handleDeleteBundle,
}) => {
  const { darkMode } = useSelector((state) => state.app);
  const classes = useStyles({
    bundleCardBackground: darkMode ? '#463f47' : '#eee',
  });

  const [curCompletionType, setCurCompletionType] = useState('');
  const [dialogues, toggleDialogue] = useDialogueManager(
    'editBundle',
    'confirmDelete'
  );

  const menuContent = useMemo(() => {
    const result = {};
    for (const key in completionInputSchema) {
      result[key] = completionInputSchema[key].name;
    }
    return result;
  }, []);

  let curTypeName = useMemo(() => {
    let result = '';
    if (curCompletionType !== '') {
      result = completionInputSchema[curCompletionType].name;
    }
    return result;
  }, [curCompletionType]);

  /**
   * Provide the length to the dependency array to make sure this recalculates when
   * a condition is added/deleted
   */
  const completionContent = useMemo(() => {
    return (
      completionBundle.conditions &&
      completionBundle.conditions.map((conditionId, index) => (
        <React.Fragment key={conditionId}>
          <CompleteConditionContainer conditionId={conditionId} />
          {index < completionBundle.conditions.length - 1 && <Divider />}
        </React.Fragment>
      ))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completionBundle, completionBundle.conditions.length]);

  const handleMenuClick = useCallback(
    (menuValue) => {
      setCurCompletionType(menuValue);
    },
    [setCurCompletionType]
  );

  /**
   * Provide the length to the dependency array to make sure this recalculates when
   * a condition is added/deleted
   */
  const generateDescription = useCallback(() => {
    const { affected_map, change_cutscene, use_fade } = completionBundle;
    if (affected_map) {
      if (change_cutscene) {
        return (
          <React.Fragment>
            Wil trigger cutscene <b>{change_cutscene}</b> if in map{' '}
            <b>{affected_map}</b>
          </React.Fragment>
        );
      } else if (use_fade) {
        return (
          <React.Fragment>
            Will use fade if in map <b>{affected_map}</b>
          </React.Fragment>
        );
      }
    }
    return `No transition will occur`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completionBundle, completionBundle.conditions.length]);

  return (
    <Card className={classes.bundleCard}>
      <CardHeader
        title={
          <Typography variant="subtitle1">
            Next: <b>{completionBundle.next_step}</b>
            <br />
          </Typography>
        }
        action={
          <React.Fragment>
            <MenuIconButton
              elementId="add_completion_menu"
              icon="post_add"
              tooltip="Add condition"
              contentDictionary={menuContent}
              handleClick={(key) => handleMenuClick(key)}
            />

            <Tooltip title="Edit bundle">
              <IconButton
                onClick={() => {
                  toggleDialogue('editBundle', 'show');
                }}
                size="large"
              >
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete bundle">
              <IconButton
                onClick={() => {
                  toggleDialogue('confirmDelete', 'show');
                }}
                size="large"
              >
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
          </React.Fragment>
        }
      />
      <CardContent>
        <Typography className={classes.descriptionText} variant="body2">
          {generateDescription()}
        </Typography>
        {completionContent}
      </CardContent>

      <GenericDialogue
        title={`Add Condition: ${curTypeName}`}
        open={curCompletionType !== ''}
        onClose={() => setCurCompletionType('')}
        maxWidth="sm"
      >
        <CompleteConditionForm
          completionType={curCompletionType}
          handleSubmit={(name, data) => {
            handleCreateCondition(curCompletionType, name, data);
            setCurCompletionType('');
          }}
        />
      </GenericDialogue>

      <GenericDialogue
        title="Edit Bundle"
        open={dialogues['editBundle']}
        onClose={() => toggleDialogue('editBundle', 'hide')}
        maxWidth="sm"
      >
        <CompletionBundleForm
          data={completionBundle}
          buttonText="Update"
          handleSubmit={(data) => {
            toggleDialogue('editBundle', 'hide');
            handleEditBundle(data);
          }}
        />
      </GenericDialogue>

      <ConfirmationDialogue
        message="Delete the completion bundle?"
        isOpen={dialogues['confirmDelete']}
        handleClose={() => toggleDialogue('confirmDelete', 'hide')}
        handleConfirm={() => {
          handleDeleteBundle();
          toggleDialogue('confirmDelete', 'hide');
        }}
      />
    </Card>
  );
};

export default CompletionBundle;
