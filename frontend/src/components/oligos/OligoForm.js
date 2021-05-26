import React, { useState, useEffect } from 'react';
import { Link, Redirect , useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import {
  FormControl,
  Form,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import './Oligos.css';


const fieldInput = ({
    input, label, text, value, type=undefined,
    as=undefined, rows=undefined, options=undefined,
    meta: { touched, error }, ...fieldAttrs
  }) => {
    return (
      <Form.Group as={Row}>
        <Form.Label column sm={4}>{label}</Form.Label>
        <Col sm={8}>
          <FormControl
            as={as}
            type={type}
            rows={rows}
            value={input.value}
            onChange={input.onChange}
            {...fieldAttrs}
          >
            {options && options.map( (option, i) => {
              return (
                <option key={option.id || i}>{option.usage || option}</option>
              )
            })}
          </FormControl>
          { text ? (
            <Form.Text muted>
              {text}
            </Form.Text>
          ) : (null)}
          <div className={`${touched && error ? 'error' : ''}`}>
            {touched && error && (
              <span className='red-lbl'>{error}</span>
            )}
          </div>
        </Col>
      </Form.Group>
    )
  };

let OligoForm = (props, { mode }) => {

  const { token } = props.auth;
  const { handleSubmit, reset } = props;
  const [usageData, setUsageData] = useState([]);
  const primerPositionData = ['Choose...', 'Sense', 'Antisense', 'Unspecified'];
  const history = useHistory();

  useEffect(() => {
    async function getOptionsData() {
      const auth_token = {
      headers: {
        'Authorization': `Token ${token}`
      }};
      const res = await axios.get(`/oligos/usages`, auth_token);
      // setUsageData(res.data.map(({ usage }) => usage));
      setUsageData(res.data);
    }
    getOptionsData();
  }, [token])

  const onSubmit = formValues => {
    props.onSubmit(formValues);
    history.push('/oligos');

    // refresh /oligos
    history.go(0);
  };

  return (
    <Form className='frm'
      onSubmit={handleSubmit(onSubmit)}
      onReset={reset}
    >
      <Field
        name='username'
        type='text'
        component={fieldInput}
        label='User'
        readOnly
      />
      <Field
        name='oligo_name'
        type='text'
        component={fieldInput}
        label='Oligo Name'
        text = 'Required'
      />
      <Field
        name='sequence'
        type='text'
        component={fieldInput}
        label='Sequence'
      />
      <Field
        name='details'
        as='textarea'
        rows={3}
        component={fieldInput}
        label='Details'
      />
      <Field
        name='primer_position'
        as='select'
        options={primerPositionData}
        component={fieldInput}
        label='Primer Position'
        defaultValue={'Choose...'}
      />
      <Field
        name='primer_partner'
        type='text'
        component={fieldInput}
        label='Primer Partner'
      />
      <Field
        name='usages'
        as='select'
        multiple={true}
        options={usageData}
        component={fieldInput}
        label='Usages'
        value='Other'
      />
      <Field
        name='gene_locus'
        type='text'
        component={fieldInput}
        label='Gene Locus'
      />
      <Field
        name='organism'
        type='text'
        component={fieldInput}
        label='Organism'
      />
      <Field
        name='company'
        type='text'
        component={fieldInput}
        label='Company'
      />
      <Field
        name='concentration'
        type='text'
        component={fieldInput}
        label='Concentration'
      />
      <Field
        name='grade'
        type='text'
        component={fieldInput}
        label='Grade'
      />
      <br />
      <Row>
        <div className='button'>
          <Button variant='primary' type='submit'>Submit</Button>
        </div>
        {/* <div className='button'>
          <Button variant='primary' type='submit' onClick={reset}>Clear Form</Button>
        </div> */}
        <div className='button'>
          <Button variant='primary'
            onClick={() => history.goBack()}
          >
            Cancel
          </Button>
        </div>
      </Row>
    </Form>
  );
}

// const required = value => (value ? undefined : 'This field is required');

const validate = values => {
    const result = {};
    if (!values.oligo_name) {
      result.oligo_name = 'Please enter an Oligo name';
    };
    return result;
  }

const mapStateToProps = state => ({
  auth: state.auth,
});

OligoForm = connect(
  mapStateToProps,
)(OligoForm);

export default reduxForm({
  form: 'createOligo',
  validate,
  touchOnBlur: false,
  enableReinitialize: true,
// keepDirtyOnReinitialize : true
})(OligoForm);