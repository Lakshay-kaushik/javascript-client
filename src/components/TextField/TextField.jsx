/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Error } from './style';
const TextField = (props) => {
  const {
     value, error, onChange, onBlur,
  } = props;
  if (Error) {
    return (
      <>
        <Input type="text" onChange={onChange} onBlur={onBlur}  />
        <br />
        <Error>{ error }</Error>
      </>
    );
  }
  return (
    <Input type="text"  onChange={onChange} onBlur={onBlur} />
  );
};
TextField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.string.isRequired,
  onBlur: PropTypes.string,
};
TextField.defaultProps = {
  disabled: false,
  error: '',
  onChange: '',
};
export default TextField;