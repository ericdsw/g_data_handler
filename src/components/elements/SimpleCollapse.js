import React, { useState, useMemo } from 'react';
import { Button } from '@mui/material';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const SimpleCollapse = ({ collapsedMessage, openedMessage, children }) => {
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
    <div>
      <Button
        onClick={() => {
          toggleCollapsed(!collapsed);
        }}
      >
        {displayMessage}
      </Button>
      <div style={{ display: collapsed ? 'none' : 'block' }}>{children}</div>
    </div>
  );
};

export default SimpleCollapse;
