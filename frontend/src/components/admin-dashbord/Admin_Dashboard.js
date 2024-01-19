import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Spinner } from 'react-bootstrap'
import { useGetAllUserQuery } from '../../services/userApi'
import { useGetAllQuizQuery } from '../../services/quizApi'
import { useGetTotalQuestionsQuery } from '../../services/quizApi'


function Content() {

  const response = useGetAllUserQuery();
  const quiz = useGetAllQuizQuery();
  const questions = useGetTotalQuestionsQuery();

  return (
    <Wrapper>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-xl-4">
            <Link style={{ textDecoration: "none" }}>
              <div className="card bg-c-blue order-card">
                <div className="card-block">
                  <h6 className="m-b-20"> Total Users</h6>
                  <h2 className="text-right mt-3"><i className="fas fa-user-graduate f-left"></i>
                    {
                      response?.isLoading ? (
                        <Spinner animation="border" />
                      ) : (
                        <span>{response?.data?.users?.length}</span>
                      )
                    }
                  </h2>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-4 col-xl-4">
            <Link style={{ textDecoration: "none" }} >
              <div className="card bg-c-yellow order-card">
                <div className="card-block">
                  <h6 className="m-b-20">Total Quiz</h6>
                  <h2 className="text-right mt-3"><i className="fas fa-book f-left"></i>
                    {
                      quiz?.isLoading ? (
                        <Spinner animation="border" />
                      ) : (
                        <span>{quiz?.data?.quizList?.length}</span>
                      )
                    }
                  </h2>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4 col-xl-4">
            <Link style={{ textDecoration: "none" }}>
              <div className="card bg-c-green order-card">
                <div className="card-block">
                  <h6 className="m-b-20">Total Questions</h6>
                  <h2 className="text-right mt-3"><i className="fas fa-question-circle f-left"></i>
                    {
                      questions?.isLoading ? (
                        <h6>
                          <Spinner animation="border" />
                        </h6>
                      ) : (
                        <span>{questions?.data?.totalQuestions?.length}</span>
                      )
                    }
                  </h2>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </Wrapper>
  )
}

export default Content


const Wrapper = styled.div`
  padding-top: 100px;


  .order-card {
    color: rgb(255, 255, 255);
  }

  .bg-c-blue {
    background: #04868f ;
  }

  .bg-c-green {
    background:#58b268;
  }

  .bg-c-yellow {
    background: #8594e5;
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


`