import React from 'react'
import styled from 'styled-components'
import { Link ,useParams } from 'react-router-dom';

function Admin_Questions() {
    const para = useParams();
    return (
        <Wrapper>

                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-xl-6">
                            <Link to={'add-questions'}>
                                <div className="card bg-c-blue order-card">
                                    <div className="card-block">
                                        <h6 className="m-b-20">Add Question</h6>
                                        <h2 className="text-right mt-3"><i className="fas fa-plus f-left"></i></h2>

                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-md-4 col-xl-6">
                            <Link to={'view-questions'}>
                                <div className="card bg-c-green order-card">
                                    <div className="card-block">
                                        <h6 className="m-b-20">View Questions</h6>
                                        <h2 className="text-right mt-3"><i className="fas fa-eye f-left"></i></h2>
                                    </div>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
                
           

        </Wrapper>
    )
}

export default Admin_Questions


const Wrapper = styled.div`
padding-top :100px;
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
    background:#4C51BF;
  }

  .bg-c-yellow {
    background: #F56565;
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