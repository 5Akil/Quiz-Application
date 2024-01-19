import React, {useEffect, useState } from 'react'
import styled from 'styled-components';
import { PuffLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import CountdownCircleTimer from "../../common/CountDownTimer";
import { toast } from 'react-toastify';
import TImes_Up from './Times_Up';
import { postAnswers } from '../../../services/axios/apiCall/questionApi';
import { getUser } from '../../../services/axios/apiCall/userApi';

function Questions({ id, title, totalTime, startTime, totalMarks ,questions }) {

    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [userID, setUserID] = useState()
    const [answers, setAnswers] = useState({});
    const [modal, setModal] = useState(false);


    const getUserId = async () => {
        let response = await getUser()
        setUserID(response?.data?.user?._id);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAnswers({ ...answers, [name]: value ? value : "unattempted" })
    }
  
    const handleNextQuestion = () => {
        if (index < questions?.length - 1) {
            setIndex(index + 1);
        }
    };
    const handlePreviousQuestion = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };
    //suffel question for every user
    const [suffeldQuestions, setSuffeldQuestions] = useState();
    function shuffleArray(array) {
        const newArray = [...array];
        newArray.reverse().forEach((item, index) => {
            const j = Math.floor(Math.random() * (index + 1));
            [newArray[index], newArray[j]] = [newArray[j], newArray[index]];
        });
        return newArray;
    }
    //current question
    const currentQuestion = suffeldQuestions?.[index]

    //convert time into seconds
    const [hours, minutes, seconds] = totalTime.split(':');
    const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

    //submit the quiz
    const handleSubmit = async (e) => {
        e.preventDefault();
        const endTime = Date.now()
        const body = { userID: userID, quizID: id, startTime: startTime, endTime: endTime, totalTime: totalTime, totalMarks: totalMarks, ...answers }
        const { data } = await postAnswers(body)

        if (data.status === "submitted" && data?.attemptId) {
            toast.success("Quiz Submited Successfully")
            navigate(`/userdashboard/result/${data?.attemptId}`)
        }
    }

    useEffect(() => {
        getUserId();
    }, [])
    useEffect(() => {
        if (questions !== null) {
            setSuffeldQuestions(shuffleArray(questions));
        }
    }, [questions])

    return (
        questions !== null ? (
            <Wrapper>
                <div className="jumbotron">
                    {
                        questions.length !== 0 ? (
                            <>
                                <div className='d-flex justify-content-between align-items-center mb-4' >
                                    <h1 >{title}</h1>
                                    <div className='me-3'>
                                        <CountdownCircleTimer totalTime={totalSeconds} setModal={setModal} />
                                    </div>
                                </div>
                                <div key={currentQuestion?._id} >
                                    <div className='d-flex justify-content-between align-items-center' >
                                        <p style={{ display: "inline", flex: "80%" }} className="text-info" >{index + 1}. &nbsp; {currentQuestion?.question}</p>
                                        <h5 style={{ textAlign: "right", color: "grey" }}>[Mark : {currentQuestion?.marks}]</h5>
                                    </div>
                                    <ul className='mt-3'>

                                        {
                                            currentQuestion?.options ? (

                                                Object.values(currentQuestion?.options).map((option, index) => (
                                                    <div className="form-check " key={index}>
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            name={currentQuestion?._id}
                                                            onChange={handleChange}
                                                            value={option}
                                                            checked={answers[currentQuestion?._id] === option}
                                                        />
                                                        <label className="form-check-label" htmlFor="option1">
                                                            {option}
                                                        </label>
                                                    </div>
                                                ))

                                            ) : (
                                                null
                                            )
                                        }
                                    </ul>
                                </div>
                                {
                                    index === questions?.length - 1 ? (
                                        <div className='d-flex justify-content-between mt-5'>
                                            <button className="btn btn-primary submit_btn" onClick={handlePreviousQuestion} disabled={index === 0} >
                                                Previous
                                            </button>
                                            <button className="btn btn-primary submit_btn me-2" onClick={handleSubmit} >
                                                Submit
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='d-flex justify-content-between mt-5'>
                                            <button className="btn btn-primary submit_btn" onClick={handlePreviousQuestion} disabled={index === 0}>
                                                Previous
                                            </button>
                                            <button className="btn btn-primary submit_btn me-2" onClick={handleNextQuestion} disabled={index === questions?.length - 1}>
                                                Next
                                            </button>
                                        </div>
                                    )
                                }
                            </>
                        ) : (
                            <div className=' mb-4' >
                                <h1 >{title}</h1>
                                <p> There is no questions right now!!!!!!!</p>
                            </div>

                        )
                    }
                </div>

                {
                    modal ?
                        <TImes_Up
                            show={modal}
                            handleSubmit={handleSubmit}
                        />
                        : null
                }


            </Wrapper>
        ) : (
            <div className="container" style={{ height: "100%", paddingTop: "100px", display: "flex", justifyContent: "center", alignItems: 'center' }}>
                <PuffLoader
                    color="rgb(115, 134, 213)"
                    size={142}
                />
            </div>
        )

    )
}

export default Questions


const Wrapper = styled.div`

padding-top : 70px;
.jumbotron{
    height: 100%;
}
p {
    color: rgb(115, 134, 213) !important;
    font-size: 20px;
}
 h1 {
    font-size: 70px;
    font-weight: 600;
    background-image: linear-gradient(to right, rgb(115, 134, 213), #b393d3);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
  }

.submit_btn {
    width: 100px;
    padding:10px 10px;
    margin-left:20px;
    background: #7386D5;
    text-decoration: none;
    border-radius: 2px;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    transition: 0.5s;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  }
  .submit_btn:hover  {
    background: #fff ;
    color:#7386D5;
  }

  @media (max-width: 1075px) {
    p{
        flex:75%
        font-size: 18px;
    }
  }
  
  
`





