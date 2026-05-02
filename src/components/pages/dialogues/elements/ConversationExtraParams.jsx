import { useMemo } from 'react';
import { Chip, Box } from '@mui/material';
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

const EXTRAS = {
  voice_file: {
    label: 'Voice File',
  },
  control_level: {
    label: 'Control Level',
  },
  autopilot_offset: {
    label: 'Autopilot Offset',
  },
  try_to_position_on_center: {
    label: 'Try to position on Center',
  },
};

const ConversationExtraParams = ({ message }) => {
  const extraChips = useMemo(() => {
    return Object.keys(EXTRAS)
      .filter((extraProperty) => message.hasOwnProperty(extraProperty))
      .filter((extraProperty) => message[extraProperty] !== '')
      .map((extraProperty) => (
        <StyledChip
          key={extraProperty}
          label={`${EXTRAS[extraProperty].label}: ${message[extraProperty]}`}
        />
      ));
  }, [message]);

  return (
    <>
      {extraChips.length > 0 && (
        <StyledChipContainer>{extraChips}</StyledChipContainer>
      )}
    </>
  );
};

export default ConversationExtraParams;
