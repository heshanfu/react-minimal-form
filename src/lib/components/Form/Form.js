import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormContext, ifDo } from "../../helpers";

class Form extends Component {
  static propTypes = {
    children: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    formData: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  handleChange = (id, value) => {
    const { formData, onChange } = this.props;
    const newFormData = { ...formData };

    newFormData[id] = value;
    onChange(newFormData);
  }

  handleSubmit = e => {
    const { onSubmit } = this.props;

    e.preventDefault();

    ifDo(onSubmit, this.props.formData);
  }

  render() {
    const { formData, children, ...rest } = this.props;

    const contextObject = {
      formData: formData,
      onChange: this.handleChange,
    };

    return (
      <FormContext.Provider value={contextObject}>
        <form onSubmit={this.handleSubmit} {...rest}>{children}</form>
      </FormContext.Provider>
    );
  }
}

export default Form;
