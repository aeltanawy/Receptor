// inspired from: https://ihsavru.medium.com/react-paginate-implementing-pagination-in-react-f199625a5c8e

import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { Link, useLocation, Redirect } from 'react-router-dom';

// import { getOligos } from '../../actions/oligos';
import './Oligos.css';
import UnAuthorized from '../UnAuthorized';


function OligoList(props) {

  //Holds the number of items to be displayed per page
  const PER_PAGE= 10;

  const { isAuthenticated } = props.auth;
  const token = props.auth.token;

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(data.length / PER_PAGE);
  const search = useLocation().search;
  const query = new URLSearchParams(search).get('q');

  useEffect(() => {
    async function getData() {
      const auth_token = {
      headers: {
        'Authorization': `Token ${token}`
      }};
      if (query) {
        const res = await axios.get(`/oligos/oligos?q=` + query, auth_token);
        setData(res.data); }
      else {
        const res = await axios.get(`/oligos/oligos`, auth_token);
        setData(res.data); }
    }
    getData();
    // props.getOligos();
    // setData(props.oligos);
  }, [token]);

  let currentPageData = (data.length !== 0) ? data
    .slice(offset, offset + PER_PAGE)
    .map( oligo =>
      <tr key={oligo.id}>
        <td>
          <Link to={`/oligo_details/${oligo.id}`}>
            {oligo.oligo_name}
          </Link>
        </td>
        <td>{oligo.username}</td>
        <td>{oligo.gene_locus}</td>
        <td colSpan='2'>{oligo.sequence}</td>
        <td colSpan='2'>{oligo.details}</td>
      </tr>
    ) : (
      <tr>
        <td colSpan='7'>No oligos in the database.</td>
      </tr>
    );

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
  }

  return (
    <React.Fragment>
      <h2 className='title'>Oligos</h2>
      <br />
      { isAuthenticated ? (
        <React.Fragment>
          <form>
            <input type='text' className='input' placeholder='Search...' name='q' />
          </form>
          <ul> </ul>
          <div className='table'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>User</th>
                  <th>Gene Locus</th>
                  <th colSpan='2'>Sequence</th>
                  <th colSpan='2'>Details</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData}
              </tbody>
            </Table>
          </div>
          <ReactPaginate
            previous Label={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            pageLinkClassName={'pagination-page'}
            previousLinkClassName={'pagination__link'}
            nextLinkClassName={'pagination__link'}
            disabledClassName={'pagination__link--disabled'}
            activeClassName={'pagination__link--active'}
          />
        </React.Fragment>
      ) : (
        <UnAuthorized />
      )}
    </React.Fragment>
  )
}

// export default OligoList;

const mapStateToProps = state => ({
  // oligos: Object.values(state.oligos),
  auth: state.auth
});

export default connect(
  mapStateToProps,
  // { getOligos }
)(OligoList);
