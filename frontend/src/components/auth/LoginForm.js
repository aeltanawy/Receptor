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

import { login } from '../../actions/auth';


const fieldInput = ({ input, label, type, placeholder, meta: { touched, error } }) => {
    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>{label}</Form.Label>
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

let LoginForm = props => {

  const hiddenField = ({ type, meta: { error } }) => {
    return (
      <div className='field'>
        <input type={type} />
        {error && <div className='error'>{error}</div>}
      </div>
    );
  };

  const onSubmit = formValues => {
    props.login(formValues);
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
        label='Username'
        placeholder='Username'
      />
      <Field
        name='password'
        type='password'
        component={fieldInput}
        label='Password'
        placeholder='Password'
      />
      <div>
        <Field
          name='non_field_errors'
          type='hidden'
          component={hiddenField}
        />
      </div>
      <div>
        <Button variant='primary' type='submit'>Login</Button>
      </div>
      <Form.Text className='frm-txt'>
        Don't have an account? <Link to='/register'>Register Now</Link>
      </Form.Text>
    </Form>
  );
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

LoginForm = connect(
  mapStateToProps,
  { login }
)(LoginForm);

export default reduxForm({
  form: 'loginForm'
})(LoginForm);