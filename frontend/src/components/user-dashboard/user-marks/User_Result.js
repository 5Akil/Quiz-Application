import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { getResult } from '../../../services/axios/apiCall/resultApi';
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Line } from 'rc-progress';

function User_Result() {
    const { userID, attemptId } = useParams();
    const [data, setData] = useState(null);
    const [percentage, setPercentage] = useState(null);
    const [message, setMessage] = useState(null)
    const [submitedAnswers, setSubmitedAnswers] = useState([])
    const [correctCount, setCorrectCount] = useState(0)

    useEffect(() => {
        result();
    }, []);
    useEffect(() => {
        if (data) {
            const percent = resultPercentage()
            setPercentage(percent)
            setSubmitedAnswers(data?.userSelectedAnswers)
        }

    }, [data, submitedAnswers])
    useEffect(() => {
        calculateCorrectCount();
    }, [submitedAnswers])
    useEffect(() => {
        if (percentage === 100) {
            setMessage("Congratulations! You aced the quiz, a true quiz master!")
        } else if (percentage === 0) {
            setMessage("Don't be discouraged; use this as a learning opportunity.")
        }
        else if (percentage <= 25) {
            setMessage("Great effort!   Keep practicing to improve your quiz scores.")
        } else if (percentage >= 50) {
            setMessage("Good job! Keep going, you're on the right track.")
        } else if (percentage >= 75) {
            setMessage("Well done! Your knowledge is impressive, keep challenging yourself.")
        } if (percentage === 100) {
            setMessage("Congratulations! You aced the quiz, a true quiz master!")
        }
    }, [percentage])

    const result = async () => {
        try {
            const response = await getResult(userID, attemptId)

            setData(response)
        } catch (error) {
            console.log(error);
        }
    }


    const convertDateToTime = (dateString) => {
        // Parse the input date string into a Date object
        const date = new Date(dateString);

        // Convert to Indian Time Zone (IST)
        const dateInIST = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        const formattedDate = dateInIST.toLocaleString('en-IN', options);
        return formattedDate;
    }

    const submissionDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
        const formattedDate = date.toLocaleString('en-IN', options);
        return formattedDate

    }
    const formatTimeDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        if (formattedTime >= data?.totalTime) {
            return data?.totalTime
        }
        return formattedTime;
    }

    const user = data?.userID                                         // user details
    const questions = data?.quizID.questions                          // questions
    const startTime = convertDateToTime(data?.startTime)              // starting time of quiz
    const endTime = convertDateToTime(data?.endTime)                  // Submit time of Quiz
    const totalTime = data?.totalTime                                 //total time 
    const attemptDate = submissionDate(data?.timeStamps)              // Date in Which attempt made
    const timeTaken = formatTimeDuration(data?.timeTaken)             // time taken bye user to complete quiz
    const correctAnswers = data?.correctAnswers                       // correct answers
    const percent = data?.percentage


    const timePercentage = () => {
        if (data) {
            const [hours, minutes, seconds] = data?.totalTime.split(':');
            const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
            const time = ((data?.timeTaken / totalSeconds) * 100)
            return time
        } else {
            return 0;
        }
    }

    const resultPercentage = () => {
        if (data) {
            if (percent == 100 || percent == 0) {
                return percent
            } else {
                return percent.toFixed(1)
            }
        } else {
            return 0;
        }
    }
    const calculateCorrectCount = () => {
        let count = 0;
        questions?.map((question) => {
            if (submitedAnswers?.[question?._id] === correctAnswers?.[question._id]) {
                count++;
            }
        });
        setCorrectCount(count);
    };


    return (
        data !== null ? (
            <>
                <Wrapper>
                    <div className="container" style={{ paddingTop: "100px", marginBottom: '18px' }}>
                        <div className="card">
                            <div className='card-body test'>
                                <div className="title"><p>User Name</p></div>
                                <div className="test-sheet-summary-header">
                                    <div className="name"><i className="fas fa-user me-3"></i> {user?.firstName} {user?.lastName}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{ marginBottom: '18px' }}>
                        <div className='row row-cols-2' >
                            <div className="col-lg-6" style={{ marginBottom: '18px' }}>
                                <div className="card " style={{ height: "275px" }}>
                                    <div className="card-body test">
                                        <div className="title">
                                            <p>Result</p>
                                        </div>
                                        <div className='d-flex justify-content-around '>
                                            <div className="mt-3 " style={{ color: percentage >= 33 ? '#0BC279 ' : '#ff7067', width: '5%' }}>
                                                {
                                                    percentage <= 33 ?
                                                        <i className="fas fa-times me-3" ></i> :
                                                        <i className="fas fa-check"></i>
                                                }

                                            </div>
                                            <div className='mt-3' style={{ color: percentage >= 33 ? '#0BC279 ' : '#ff7067', width: '45%' }}>

                                                <span >{message}</span >
                                                <div className=' mt-3 '>
                                                    <div className='d-flex justify-content-between' style={{ marginRight: '30px' }}><span style={{ color: '#aeb9c6', marginRight: "10px" }}>Total Questions</span> <span style={{ color: 'black' }}>:  {questions?.length} </span> </div>
                                                    <div className='d-flex justify-content-between' style={{ marginRight: '30px', }}><span style={{ color: '#aeb9c6', marginRight: "10px" }}>Correct Answers</span> <span style={{ color: 'black' }}>:  {correctCount} </span> </div>
                                                </div>
                                            </div>
                                            <div style={{ width: 200, height: 200 }}>
                                                <CircularProgressbar value={percentage} text={`${percentage}% `} styles={buildStyles({
                                                    textSize: '16px',
                                                    pathTransitionDuration: 0.5,
                                                    pathColor: percentage >= 33 ? '#0BC279 ' : '#ff7067',
                                                    textColor: percentage >= 33 ? '#0BC279 ' : '#ff7067',
                                                })} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6" style={{ marginBottom: '18px' }}>
                                <div className="card " style={{ height: "275px" }}>
                                    <div className="card-body test">
                                        <div className="title">
                                            <p>Timer</p>
                                        </div>
                                        <div className='d-flex'>
                                            <div className="name " style={{ flex: "50%" }}>
                                                <p>
                                                    <i className="fas fa-history me-3"></i>
                                                    <span >Total Time</span >
                                                </p>
                                                <p>{timeTaken} / <span style={{ color: '#aeb9c6' }}>{totalTime}</span></p>
                                            </div>
                                        </div>
                                        <Line percent={timePercentage()} strokeWidth={1} strokeColor="black" />
                                        <div className='d-flex mt-3 '>
                                            <p style={{ marginRight: '30px' }}><span style={{ color: '#aeb9c6', marginRight: "10px" }}>Start Time</span> <span>{startTime} </span> </p>
                                            <p><span style={{ color: '#aeb9c6', marginRight: "10px" }}>Date</span> <span>{attemptDate} </span> </p>
                                        </div>
                                        <p style={{ margin: '0px' }}><span style={{ color: '#aeb9c6', marginRight: "10px" }}>End  Time</span> <span> {endTime}  </span> </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="container" style={{ marginBottom: '18px' }}>
                        <h4 className='mb-4'>Solution</h4>
                        <div className="accordion" >
                            {
                                questions?.map((item, index) => {
                                    index++ 
                                    return <div key={item._id}>

                                        <div className="accordion-item" >
                                            <h2 className="accordion-header" id={`#${index}`}>
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${index}`} aria-expanded="false" aria-controls={`#${index}`}>
                                                    <div >
                                                        <p style={{ margin: '0' }} ><span style={{ paddingRight: "16px", borderRight: '1px solid #aeb9c6' }}>Q.{index}</span> <span className='ms-3' >{item?.question}</span> </p>
                                                    </div>
                                                </button>
                                            </h2>
                                            <div id={`${index}`} className="accordion-collapse collapse " aria-labelledby={`#${index}`} >
                                                <div className="accordion-body">

                                                    {
                                                        item?.options ? (

                                                            Object.values(item?.options).map((option, index) => {
                                                                let checked, right;
                                                                submitedAnswers?.[item?._id] === option ? checked = true : checked = false
                                                                correctAnswers?.[item._id] === option ? right = true : right = false
                                                                index++
                                                                return <>

                                                                    <div className="form-check d-flex" key={index} style={{ backgroundColor: right ? '#f0fdf8' : null }}>
                                                                        <div style={{ width: '5%' }}>
                                                                            {
                                                                                right ? <i className="fas fa-check" style={{ color: '#0BC279' }}></i> : checked ? <i className="fas fa-times me-3" style={{ color: '#ff7067' }} ></i> : null
                                                                            }
                                                                        </div>
                                                                        <div style={{ width: '90%' }}>
                                                                            <label className="form-check-label" htmlFor="option1">
                                                                                <input className="form-check-input me-3"
                                                                                    type="checkbox"
                                                                                    checked={checked}
                                                                                    readOnly
                                                                                />
                                                                                {option}
                                                                            </label>

                                                                        </div>
                                                                    </div>
                                                                </>
                                                            })

                                                        ) : (
                                                            null
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                })
                            }
                        </div>
                    </div>
                </Wrapper>
            </>
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

export default User_Result


const Wrapper = styled.div`

.title{
    font-family: Aktiv Grotesk , sans-serif;
    font-size: .75rem;
    line-height: 15px;
    font-weight: 600;
    letter-spacing: .05em;
    text-decoration: inherit;
    text-transform: uppercase;
    color: #0f2830;
    margin-top: 1px;
    margin-left: 4px;
}

.test{
    box-shadow: 3px 4px 10px rgba(201,216,225,.34);
    border-radius: 6px;
    padding: 20px;
}
h4{
    font-size: 40px;
    font-weight: 600;
    background-image: linear-gradient(to right, rgb(115, 134, 213), rgb(179, 147, 211));
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
}
.name{
    font-family: Aktiv Grotesk , sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-size: 1.375rem;
    line-height: 1.5rem;
    font-weight: 700;
    letter-spacing: normal;
    text-decoration: inherit;
    text-transform: inherit;
}


`