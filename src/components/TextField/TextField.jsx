/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Error } from './style';
const TextField = (props) => {
  const { onChange, value, error } = props;
  if (Error) {
    return (
      <>
        <Input type="text"  onChange={onChange} error />
        <br />
        <Error>{ error }</Error>
      </>
    );
  }
  return (
    <Input type="text"  onChange={onChange} />
  );
};
TextField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};
export default TextField;