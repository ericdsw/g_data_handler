import { CSSProperties, ReactNode } from 'react';
import { Box, Fab, FabOwnProps, Grid, Stack } from '@mui/material';

type ButtonMetaDataEntry = {
  title: string,
  icon: ReactNode,
  color?: FabOwnProps['color'],
  hidden?: boolean,
  style?: CSSProperties,
  onClick?: () => void,
}

type FabAbsoluteContainerProps = {
  buttonMetadata: ButtonMetaDataEntry[],
  bottomSpacing?: number,
  rightSpacing?: number
}

const FabAbsoluteContainer = ({
  buttonMetadata,
  bottomSpacing = 32,
  rightSpacing = 32,
}: FabAbsoluteContainerProps) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: bottomSpacing,
        right: rightSpacing,
      }}
    >
      <Stack spacing={2}>
        {buttonMetadata.map((data) => (
          <Grid
            key={data.title}
            id={data.title}
            sx={{
              maxHeight: data.hidden ? 0 : 70,
              transition: 'max-height 0.4s ease',
            }}
          >
            <Fab
              variant="extended"
              color={data.color || 'primary'}
              onClick={data.onClick}
              sx={{
                transform: data.hidden ? 'scale(0.0)' : 'scale(1.0)',
                transition: 'transform 0.2s ease',
                width: 200,
                ...(data.style || {}),
              }}
            >
              {data.icon}
              &nbsp; {data.title}
            </Fab>
          </Grid>
        ))}
      </Stack>
    </Box>
  );
};

export default FabAbsoluteContainer;
