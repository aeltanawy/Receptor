import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  FormControl,
  Form,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { register } from '../../actions/auth';


const fieldInput = ({ input, label, type, placeholder, meta: { touched, error } }) => {
    return (
      <Form.Group as={Row}>
        <Form.Label column sm={4}>{label}</Form.Label>
        <Col sm={8}>
          <FormControl
            type={type}
            placeholder={placeholder}
            value={input.value}
            onChange={input.onChange}
          />
          <div className={`${touched && error ? 'error' : ''}`}>
            {touched && error && (
              <span className='red-lbl'>{error}</span>
            )}
          </div>
        </Col>
      </Form.Group>
    )
  };

let RegisterForm = props => {

  const onSubmit = formValues => {
    props.register(formValues);
  };

  if (props.isAuthenticated) {
    return <Redirect to='/' />;
  };

  return (
    <Form className='frm' onSubmit={props.handleSubmit(onSubmit)}>
      <Field
        name='username'
        type='text'
        component={fieldInput}
        placeholder='Username'
        label='Username'
        validate={[required, minLength3, maxLength15]}
      />
      <Field
        name='email'
        type='email'
        component={fieldInput}
        placeholder='example@email.com'
        label='Email'
        validate={required}
      />
      <Field
        name='password'
        type='password'
        component={fieldInput}
        placeholder='Password'
        label='Password'
        validate={required}
      />
      <Field
        name='password2'
        type='password'
        component={fieldInput}
        placeholder='Password'
        label='Confirm Password'
        validate={[required, passwordMatch]}
      />
      <div>
        <Button variant='primary' type='submit'>Register</Button>
      </div>
      <Form.Text className='frm-txt'>
        Already have an account? <Link to='/login'>Login</Link>
      </Form.Text>
    </Form>
  );
}

const required = value => (value ? undefined : 'Required');

const minLength = min => value =>
value && value.length < min
  ? `Must be at least ${min} characters`
  : undefined;

const maxLength = max => value =>
value && value.length > max
  ? `Must be ${max} characters or less`
  : undefined;

const minLength3 = minLength(3);
const maxLength15 = maxLength(15);

const passwordMatch = (value, allValues) =>
  value !== allValues.password ? 'Passwords do not match' : undefined;

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

RegisterForm = connect(
  mapStateToProps,
  { register }
)(RegisterForm);

export default reduxForm({
  form: 'registerForm'
})(RegisterForm);