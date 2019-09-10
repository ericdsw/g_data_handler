import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    IconButton,
    Icon,
    Divider,
    Tooltip
} from '@material-ui/core';

import CompleteConditionContainer from '../../containers/CompleteConditionContainer';

const styles = theme => ({
    bundleCard: {
        background: '#555',
    }
});

const CompletionBundle = props => {

    const { classes, completionBundle } = props;

    const completionContent = (
        completionBundle.conditions &&
        completionBundle.conditions.map((conditionId, index) => (
            <React.Fragment
                key={conditionId}
            >
                <CompleteConditionContainer
                    conditionId={conditionId}
                />
                {index < completionBundle.conditions.length - 1 &&
                    <Divider />
                }
            </React.Fragment>
        ))
    )

    return (
        <Card className={classes.bundleCard}>
            <CardHeader
                title={
                    <Typography variant='subtitle1'>
                        Next: <b>{completionBundle.next_step}</b>
                    </Typography>
                }
                action={
                    <Tooltip title='Add condition to bundle'>
                        <IconButton>
                            <Icon>post_add</Icon>
                        </IconButton>
                    </Tooltip>
                }
            />
            <CardContent>
                {completionContent}
            </CardContent>
        </Card>
    );

}

export default withStyles(styles)(CompletionBundle);
