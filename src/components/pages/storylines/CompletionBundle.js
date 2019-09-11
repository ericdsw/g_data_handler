import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Divider,
    Tooltip,
    IconButton,
    Icon,
} from '@material-ui/core';

import CompleteConditionContainer from '../../containers/CompleteConditionContainer';
import CompleteConditionForm from './forms/CompleteConditionForm';
import CompletionBundleForm from './forms/CompletionBundleForm';
import { 
    GenericDialogue, 
    ConfirmationDialogue, 
    MenuIconButton 
} from '../../elements';
import { completionInputSchema } from '../../../globals';
import { useDialogueManager } from '../../../hooks';

const styles = theme => ({
    bundleCard: {
        background: '#555',
    },
    descriptionText: {
        marginBottom: 16,
        fontStyle: 'italic'
    }
});

const CompletionBundle = props => {

    // Parameters
    const { classes, completionBundle } = props;

    // Methods
    const { handleCreateCondition, handleEditBundle, handleDeleteBundle } = props;

    const [curCompletionType, setCurCompletionType] = useState('');
    const [dialogues, toggleDialogue] = useDialogueManager(
        'editBundle', 'confirmDelete'
    );

    const menuContent = {}
    for (const key in completionInputSchema) {
        menuContent[key] = completionInputSchema[key].name;
    }

    let curTypeName = '';
    if (curCompletionType !== '') {
        curTypeName = completionInputSchema[curCompletionType].name
    }

    const completionContent = (
        completionBundle.conditions &&
        completionBundle.conditions.map((conditionId, index) => (
            <React.Fragment key={conditionId}>
                <CompleteConditionContainer
                    conditionId={conditionId}
                />
                {index < completionBundle.conditions.length - 1 &&
                    <Divider />
                }
            </React.Fragment>
        ))
    )

    function handleMenuClick(menuValue) {
        setCurCompletionType(menuValue);
    }

    function generateDescription() {
        const { affected_map, change_cutscene, use_fade } = completionBundle;
        if (affected_map) {
            if (change_cutscene) {
                return (
                    <React.Fragment>
                        Wil trigger cutscene <b>{change_cutscene}</b> if in 
                        map <b>{affected_map}</b>
                    </React.Fragment>
                );
            } else if(use_fade) {
                return (
                    <React.Fragment>
                        Will use fade if in map <b>{affected_map}</b>
                    </React.Fragment>
                );
            }
        } 
        return `No transition will occur`;
    }

    return (
        <Card className={classes.bundleCard}>
            <CardHeader
                title={
                    <Typography variant='subtitle1'>
                        Next: <b>{completionBundle.next_step}</b>
                        <br />
                    </Typography>
                }
                action={
                    <React.Fragment>
                        <MenuIconButton
                            elementId='add_completion_menu'
                            icon='post_add'
                            tooltip='Add condition'
                            contentDictionary={menuContent}
                            handleClick={key => handleMenuClick(key)}
                        />
                        
                        <Tooltip title='Edit bundle'>
                            <IconButton
                                onClick={() => {
                                    toggleDialogue('editBundle', 'show');
                                }}
                            >
                                <Icon>edit</Icon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Delete bundle'>
                            <IconButton
                                onClick={() => {
                                    toggleDialogue('confirmDelete', 'show')
                                }}
                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        </Tooltip>
                    </React.Fragment>
                }
            />
            <CardContent>
                <Typography className={classes.descriptionText} variant='body2'>
                    {generateDescription()}
                </Typography>
                {completionContent}
            </CardContent>

            <GenericDialogue
                title={`Add Condition: ${curTypeName}`}
                open={curCompletionType !== ''}
                onClose={() => setCurCompletionType('')}
                maxWidth='sm'
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
                title='Edit Bundle'
                open={dialogues['editBundle']}
                onClose={() => toggleDialogue('editBundle', 'hide')}
            >
                <CompletionBundleForm
                    handleSubmit={data => {
                        toggleDialogue('editBundle', 'hide');
                        handleEditBundle(data);
                    }}
                    bundle={completionBundle}
                />
            </GenericDialogue>

            <ConfirmationDialogue
                message='Delete the completion bundle?'
                isOpen={dialogues['confirmDelete']}
                handleClose={() => toggleDialogue('confirmDelete', 'hide')}
                handleConfirm={() => {
                    handleDeleteBundle();
                    toggleDialogue('confirmDelete', 'hide');
                }}
            />

        </Card>
    );

}

export default withStyles(styles)(CompletionBundle);
