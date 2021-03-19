// inspired from: https://ihsavru.medium.com/react-paginate-implementing-pagination-in-react-f199625a5c8e

import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import store from '../../store';
import './Oligos.css';


function OligoList(props) {

  //Holds the number of items to be displayed per page
  const PER_PAGE= 25;

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(data.length / PER_PAGE);

  useEffect(() => {
    getData();
  },[]);

  const getData = async() => {
    const auth_token = {
    headers: {
      'Authorization': `Token ${store.getState().auth.token}`
    }};
    const res = await axios.get(`/oligos/oligos`, auth_token);
    setData(res.data);
  }

  const currentPageData = data
    .slice(offset, offset + PER_PAGE)
    .map( oligo =>
      <tr key={oligo.id}>
        <td>{oligo.oligo_name}</td>
        <td>{oligo.username}</td>
        <td>{oligo.gene_locus}</td>
        <td colSpan='2'>{oligo.sequence}</td>
        <td colSpan='2'>{oligo.details}</td>
      </tr>
    );


  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
  }

  return (
    <React.Fragment>
      <h2 className='title'>Oligos</h2>
      <br />
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
  )
}

export default OligoList;