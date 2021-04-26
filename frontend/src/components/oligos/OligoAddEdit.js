import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { getOligo, addOligo, editOligo } from '../../actions/oligos';
import OligoForm from './OligoForm';


function OligoAddEdit(props) {

  const [data, setData] = useState();
  const [mode, setMode] = useState(undefined);
  const [user, setUser] = useState('');
  const { id } = useParams();
  const isAddMode = !id;

  const onSubmit = formValues => {
    isAddMode ? props.addOligo(formValues) : props.editOligo(id, formValues);
  };

  useEffect(() => {
    if (!isAddMode) {
      getOligo(id);
      // setData(props.oligo);
      setMode('Edit');
    } else {
      setMode('Add');
    };
    setUser(props.auth.user.username);
  }, [id, isAddMode, props.auth.user.username])


  return (
    <React.Fragment>
      <h2 className='title'>{mode} Oligo</h2>
      <br />
      { user ?
        <OligoForm
          onSubmit={onSubmit}
          initialValues={{'username': user}}
        />
        : null
      }
      <br />
    </React.Fragment>
  )
}

// export default OligoAddEdit;

const mapStateToProps = state => ({
  oligo: state.oligos,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getOligo, addOligo, editOligo }
)(OligoAddEdit);