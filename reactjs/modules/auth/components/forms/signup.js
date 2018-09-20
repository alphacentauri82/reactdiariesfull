import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';


class SignupForm extends Component {
  static get propTypes() {
    return {
      onSubmit: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      schema: {
        type: 'object',
        required: ['email', 'username', 'password', 'role'],
        properties: {
          email: { type: 'string', title: 'email' },
          name: { type: 'string', title: 'Name' },
          username: { type: 'string', title: 'User Name' },
          password: { type: 'string', title: 'Password' },
          role: {
            type: 'string',
            title: 'User type',
            enum: [
              'Student',
              'Profesor',
              'admin',
            ],
          },
        },
      },
      uiSchema: {
        password: {
          'ui:widget': 'password',
        },
        role: {
          'ui:widget': 'radio',
          'ui:options': {
            inline: true,
          },
        },
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(form) {
    this.props.onSubmit(form.formData);
  }

  render() {
    const { schema, uiSchema } = this.state;
    return (
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default SignupForm;
