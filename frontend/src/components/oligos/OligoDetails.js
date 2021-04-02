import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { Container, Col, Row, Button } from 'react-bootstrap';

import './Oligos.css';
import store from '../../store';
// import { getOligo } from '../../actions/oligos';


function OligoDetails(props) {

  const token = store.getState().auth.token;

  const [data, setData] = useState();
  const { user } = props.auth;
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      const auth_token = {
      headers: {
        'Authorization': `Token ${token}`
      }};
      const res = await axios.get(`/oligos/oligos/${id}`, auth_token);
      setData(res.data);
    }
    getData();
    console.log(data);
  }, [token, id]);

  const oligoData = data => {
    return;
  };

  const editOligo = () => {
    return;
  };

  const deleteOligo = () => {
    return;
  };

  const copyOligo = () => {
    return;
  };

  return (
    <React.Fragment>
      {data ? (
        <div className='detail'>
          <h2 className='title'><b>{data.oligo_name}</b> Oligo Details</h2>
          <br />
          <Container>
            <Col>
              <Row>
                <h4 className='title'>General</h4>
              </Row>
              <Row>
                <b>User:</b>
                <span>{data.username}</span>
              </Row>
              <Row>
                <b>Created:</b>
                <span>{data.create_date}</span>
              </Row>
              <Row>
                <b>Modified:</b>
                <span>{data.modified_date}</span>
              </Row>
              {/* <Row>
                <b>Synthesized at:</b>
                <span>{data.synthesized}</span>
              </Row> */}
              <Row>
                <b>Concentration:</b>
                <span>{data.concentration}</span>
              </Row>
              <Row>
                <b>Grade:</b>
                <span>{data.grade}</span>
              </Row>
              <Row>
                <b>Usage:</b>
              </Row>
              <Row>
                { data.usages && data.usages.map( usage => {
                  return (
                    <li>usage</li>
                  )
                })}
              </Row>
              <br />
              <Row>
                <h4 className='title'>Details</h4>
                <span>{data.details}</span>
              </Row>
              <br />
              <Row>
                <h4 className='title'>Sequence Information</h4>
              </Row>
              <Row>
                <b>Sequence:</b>
                <span>{data.sequence}</span>
              </Row>
              <Row>
                <b>Length:</b>
                <span>{data.sequence.length}</span>
              </Row>
              <br />
              <Row>
                <h4 className='title'>Hybridization Information</h4>
              </Row>
              <Row>
                <b>Organism:</b>
                <span>{data.organism}</span>
              </Row>
              <Row>
                <b>Gene Locus:</b>
                <span>{data.gene_locus}</span>
              </Row>
              <Row>
                <b>Primer Position:</b>
                <span>{data.primer_position}</span>
              </Row>
              <Row>
                <b>Primer Partner:</b>
                <span>{data.primer_partner}</span>
              </Row>
            </Col>
          </Container>
          <br />
          <Row>
            {data.username === user.username ? (
              <div>
                <Button variant='primary' href={`/oligo/${id}/edit`}>Edit</Button>
                <Button variant='primary' onClick={deleteOligo}>Delete</Button>
              </div>
            ):(null)}
            <Button variant='primary' onClick={copyOligo}>Copy to New Oligo</Button>
          </Row>
        </div>
      ):(null)}
    </React.Fragment>
  )
}

// export default OligoDetails;

const mapStateToProps = state => ({
  auth: state.auth,
  // oligo: state.oligos,
});

export default connect(
  mapStateToProps,
  // { getOligo }
)(OligoDetails);