import React, { useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { useAlert } from 'react-alert';

import './Oligos.css';
import { getOligo, deleteOligo } from '../../actions/oligos';


function OligoDetails(props)
{

  const { user } = props.auth;
  const { id } = useParams();
  const history = useHistory();
  const alert = useAlert();

  useEffect(() =>
  {
    props.getOligo(id);
  }, [id]);

  const deleteOligo = () =>
  {
    const oligo_name = props.oligo.oligo_name;
    if (window.confirm(`Are you sure you want to delete '${oligo_name}'?`)) {
      props.deleteOligo(id);
      alert.show(`Oligo '${oligo_name}' has been deleted!`);
      history.push('/oligos');
    };
  };

  return (
    <React.Fragment>
      {props.oligo ? (
        <div className='detail'>
          <h2 className='title'><b>{props.oligo.oligo_name}</b> Oligo Details</h2>
          <br />
          <Container>
            <Col>
              <Row>
                <h4 className='title'>General</h4>
              </Row>
              <Row>
                <b>User:</b>
                <span>{props.oligo.username}</span>
              </Row>
              <Row>
                <b>Created:</b>
                <span>{props.oligo.created_date}</span>
              </Row>
              <Row>
                <b>Modified:</b>
                <span>{props.oligo.modified_date}</span>
              </Row>
              <Row>
                <b>Concentration:</b>
                <span>{props.oligo.concentration}</span>
              </Row>
              <Row>
                <b>Grade:</b>
                <span>{props.oligo.grade}</span>
              </Row>
              <Row>
                <b>Usage:</b>
              </Row>
              {props.oligo.usages && props.oligo.usages.map((usage, i) =>
              {
                return (
                  <Row key={i}>
                    <li>{usage}</li>
                  </Row>
                )
              })}
              <br />
              <Row>
                <h4 className='title'>Details</h4>
              </Row>
              <Row>
                <span>{props.oligo.details}</span>
              </Row>
              <br />
              <Row>
                <h4 className='title'>Sequence Information</h4>
              </Row>
              <Row>
                <b>Sequence:</b>
                <span>{props.oligo.sequence}</span>
              </Row>
              <Row>
                <b>Length:</b>
                <span>{props.oligo.sequence.length}</span>
              </Row>
              <br />
              <Row>
                <h4 className='title'>Hybridization Information</h4>
              </Row>
              <Row>
                <b>Organism:</b>
                <span>{props.oligo.organism}</span>
              </Row>
              <Row>
                <b>Gene Locus:</b>
                <span>{props.oligo.gene_locus}</span>
              </Row>
              <Row>
                <b>Primer Position:</b>
                <span>{props.oligo.primer_position}</span>
              </Row>
              <Row>
                <b>Primer Partner:</b>
                <span>{props.oligo.primer_partner}</span>
              </Row>
            </Col>
          </Container>
          <br />
          <Row>
            {props.oligo.username === user.username ? (
              <React.Fragment>
                <div className='button loffset'>
                  <Link to={`/edit/${id}/`}>
                    <Button variant='primary'>Edit</Button>
                  </Link>
                </div>
                <div className='button'>
                  <Button variant='primary' onClick={deleteOligo}>Delete</Button>
                </div>
              </React.Fragment>
            ) : (null)}
            {/* <div className='button'>
              <Button variant='primary' href={`/copy/${id}/`}>Copy to New Oligo</Button>
            </div> */}
          </Row>
        </div>
      ) : null}
    </React.Fragment>
  )
}

// export default OligoDetails;

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  oligo: state.oligos[ownProps.match.params.id],
});

export default connect(
  mapStateToProps,
  { getOligo, deleteOligo }
)(OligoDetails);
