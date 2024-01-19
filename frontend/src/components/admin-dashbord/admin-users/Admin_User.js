import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Spinner from 'react-bootstrap/Spinner';
import { useGetAllUserQuery } from '../../../services/userApi';

function Admin_User() {
const { data ,isLoading }  = useGetAllUserQuery()
  
  
  return (
    <Wrapper>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-xl-6">
            <Link to={'list'}>
              <div className="card bg-c-blue order-card">
                <div className="card-block">
                  <h6 className="m-b-20">Total Users</h6>
                  <h2 className="text-right mt-4"><i className="fas fa-user-graduate f-left"></i>
                    {
                      isLoading ? (

                        <h6>
                          <Spinner animation="border" />
                        </h6>
                      ) : (
                        
                        <span>{data?.users?.length}</span>
                      )
                    }
                  </h2>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4 col-xl-6">
            <Link to={'/admindashboard/results'}>
              <div className="card bg-c-green order-card">
                <div className="card-block">
                  <h6 className="m-b-20"><Link style={{ textDecoration: "none", color: "white" }}>Users Results</Link> </h6>
                  <h2 className="text-right mt-4"><i className="fas fa-sort-numeric-up f-left"></i><span>:)</span></h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

    </Wrapper>
  )
}

export default Admin_User



const Wrapper = styled.div`

padding-top:100px;

a:link {
    text-decoration: none;
  }

  .order-card {
    color: rgb(255, 255, 255);
  }

  .bg-c-blue {
    background: #04868f;
  }

  .bg-c-green {
    background:#58b268;
  }

  .bg-c-yellow {
    background: #4C51BF;
  }

  .bg-c-pink {
    background: #663a30;
  }


  .card {
    
    -webkit-box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
    box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
    border: 1px solid black;
    margin-bottom: 30px;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }

  .card .card-block {
    padding: 25px;
  }

  .order-card i {
    font-size: 26px;
  }

  .f-left {
    float: left;
  }

  .f-right {
    float: right;
  }
  header {
  left: 0px;
  right: 0px;
}

`