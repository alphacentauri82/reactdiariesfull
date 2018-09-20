import React, { Component, PropTypes } from 'react';
import Form from 'react-jsonschema-form';


class LoginForm extends Component {
  static get propTypes() {
    return {
      onSubmit: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      schema: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string', title: 'User Name' },
          password: { type: 'string', title: 'Password' }
        }
      },
      uiSchema: {
        password: {
          'ui:widget': 'password'
        }
      }
    };
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
        onSubmit={this.handleSubmit.bind(this)}
      />
    );
  }
}

export default LoginForm;
