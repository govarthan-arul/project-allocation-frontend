import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./input.css";

const Input = ({
  value,
  label,
  name,
  placeholder,
  type,
  onChange,
  onBlur,
  className,
  as,
  style,
  floatingClassName,
  autoComplete,
  readOnly,
  required,
  feedType,
  errmsg
}) => (
  <FloatingLabel className={floatingClassName} name={name} label={label}>
    <Form.Control
      readOnly={readOnly}
      as={as}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      className={className}
      style={style}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete={autoComplete}
      required={required}
    />
    <Form.Control.Feedback 
      type={feedType}
    >
      {errmsg}
    </Form.Control.Feedback> 
  </FloatingLabel>
);

export default Input;
