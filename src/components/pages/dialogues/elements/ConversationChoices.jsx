import { useMemo } from 'react';
import { Chip, Tooltip, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
  [theme.breakpoints.down('lg')]: {
    marginBottom: theme.spacing(1),
  },
}));
const StyledChipContainer = styled(Box)(({ theme }) => ({
  borderTop: '1px solid #333',
  marginTop: 12,
  paddingTop: 12,
}));

const ConversationChoices = ({ message }) => {

  const choicesChips = useMemo(() => {
    if (!message.choices) {
      return [];
    }

    return message.choices.map((currentChoice) => {
      if (currentChoice.next_message) {
        const label = `${currentChoice.key}: ${currentChoice.value}`;
        return (
          <Tooltip
            key={currentChoice.key}
            title={`Next Message: ${currentChoice.next_message}`}
          >
            <StyledChip
              color="primary"
              label={label}
              style={{
                border: currentChoice.isDefaultCancel
                  ? '1px solid red'
                  : 'none',
              }}
            />
          </Tooltip>
        );
      } else {
        return (
          <StyledChip
            key={currentChoice.key}
            label={`${currentChoice.key}: ${currentChoice.value}`}
            sx={{
              border: currentChoice.isDefaultCancel ? '1px solid red' : 'none',
            }}
          />
        );
      }
    });
  }, [message]);

  return (
    <>
      {choicesChips.length > 0 && (
        <StyledChipContainer>{choicesChips}</StyledChipContainer>
      )}
    </>
  );
};

export default ConversationChoices;
