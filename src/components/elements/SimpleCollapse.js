import React, { useState, useMemo } from 'react';
import { Button, Icon } from '@mui/material';

const SimpleCollapse = ({ collapsedMessage, openedMessage, children }) => {
  const [collapsed, toggleCollapsed] = useState(true);
  const displayMessage = useMemo(() => {
    return (
      <>
        {collapsed ? collapsedMessage : openedMessage}
        <Icon>{collapsed ? 'expand_less' : 'expand_more'}</Icon>
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
