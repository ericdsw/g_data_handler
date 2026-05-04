import { ReactNode, useState, useMemo } from 'react';
import { Box, Button } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

type SimpleCollapseProps = {
  collapsedMessage: string,
  openedMessage: string,
  children: ReactNode | ReactNode[]
}

const SimpleCollapse = ({ collapsedMessage, openedMessage, children }: SimpleCollapseProps) => {
  const [collapsed, toggleCollapsed] = useState(true);
  const displayMessage = useMemo(() => {
    return (
      <>
        {collapsed ? collapsedMessage : openedMessage}
        {collapsed ? <ExpandMore /> : <ExpandLess />}
      </>
    );
  }, [collapsedMessage, openedMessage, collapsed]);

  return (
    <Box>
      <Button
        onClick={() => {
          toggleCollapsed(!collapsed);
        }}
      >
        {displayMessage}
      </Button>
      <Box sx={{ display: collapsed ? 'none' : 'block' }}>{children}</Box>
    </Box>
  );
};

export default SimpleCollapse;
