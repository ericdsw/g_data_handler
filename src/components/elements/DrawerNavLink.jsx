import React from 'react';
import { NavLink } from 'react-router-dom';

const DrawerNavLink = React.forwardRef(({ activeClassName, ...props }, ref) => (
  <NavLink ref={ref} {...props} className={activeClassName} />
));

export default DrawerNavLink;
