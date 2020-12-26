import React from 'react';
// font awesome = 'fa' no className
import { Link } from 'react-router-dom';

export default props => (
  <li>
    <Link to={props.path}>
      <i className={`fa fa-${props.icon}`}></i> <span>{props.label}</span>
    </Link>
  </li>
);
