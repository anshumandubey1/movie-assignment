import React from 'react';
import '../styles/ErrorBox.sass';

const ErrorBox = ({ error }) => {
  return <div className="ErrorBox">{error.message}</div>;
};

export default ErrorBox;
