import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Divider,
} from '@material-ui/core';

import CompleteConditionContainer from '../../containers/CompleteConditionContainer';
import CompleteConditionForm from './forms/CompleteConditionForm';
import { GenericDialogue, MenuIconButton } from '../../elements';
import { completionInputSchema } from '../../../globals';

const styles = theme => ({
    bundleCard: {
        background: '#555',
    }
});

const CompletionBundle = props => {

    // Parameters
    const { classes, completionBundle } = props;

    // Methods
    const { handleCreateCondition } = props;

    const [curCompletionType, setCurCompletionType] = useState('');

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

    return (
        <Card className={classes.bundleCard}>
            <CardHeader
                title={
                    <Typography variant='subtitle1'>
                        Next: <b>{completionBundle.next_step}</b>
                    </Typography>
                }
                action={
                    <MenuIconButton
                        elementId='add_completion_menu'
                        icon='post_add'
                        contentDictionary={menuContent}
                        handleClick={key => handleMenuClick(key)}
                    />
                }
            />
            <CardContent>
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

        </Card>
    );

}

export default withStyles(styles)(CompletionBundle);
