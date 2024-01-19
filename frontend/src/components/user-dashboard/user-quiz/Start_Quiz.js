import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Questions from './Questions.js'
import { getSingleQuiz } from '../../../services/axios/apiCall/quizApi.js';
import { PuffLoader } from 'react-spinners';


function Start_Quiz() {
    const [start, setStart] = useState(false)
    const [quiz, setQuiz] = useState(null)
    const [startTime, setStartTime] = useState()
    const [totalTime, setTotalTime] = useState()
    const { id } = useParams();


    //get quiz data
    const getQuiz = async () => {
        const response = await getSingleQuiz(id)
        setQuiz(response?.data?.quiz)
        setTotalTime(response?.data?.quiz?.totalTime)
    }
    useEffect(() => {
        getQuiz()
    }, [])

    // calculate total marks after getting  quiz data
    const total = 0;
    const totalMark = (questions) => {
        let total = 0;
        questions?.forEach((question) => {
            total += question.marks
        })
        return total
    }

    //start the quiz
    const letStart = () => {
        setStartTime(Date.now())
        setStart(true)
    }
    return (
        quiz !== null ? (
            <>
                {
                    !start ? (
                        <div className="container" style={{ paddingTop: "100px" }}>
                            <div className="jumbotron">
                                <h3 className="text-info text-center">Before you start the Exam, here are the rules</h3>
                                <div className="row">
                                    <div className="card border-info">
                                        <div className="card-body text-info">
                                            <h4 className="card-title">Exam Details :</h4>
                                            <ul style={{ listStyle: "decimal" }}>
                                                <li>Exam Name :  {quiz?.title}</li>
                                                <li>Total Question : {quiz?.questions.length}</li>
                                                <li>Total Marks : {totalMark(quiz?.questions)}</li>
                                            </ul>
                                            <p></p>
                                            <h4 className="card-title">Rules :</h4>
                                            <ul style={{ listStyle: "decimal" }}>
                                                <li>All questions are multiple choice question.</li>
                                                <li><span className="text-danger">Only one choice is correct.</span></li>
                                                <li>If you press refresh or go back to the previous page, quiz will be terminated and the quiz will be counted as attempted.</li>
                                                <li>Try to answer as quickly as you can.</li>
                                                <li>Questions are displayed randomly for every user.</li>
                                                <li>You will be told your marks immediately when you submit the answer.</li>
                                            </ul>
                                            <p></p>
                                            <Link className="btn btn-info" onClick={() => letStart()} >Let's Start</Link>
                                        </div>
                                        <div className="card-footer">Best Of Luck</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ) : (
                        <Questions id={id} title={quiz?.title} startTime={startTime} totalTime={totalTime} totalMarks={totalMark(quiz?.questions)} questions={quiz?.questions} />
                    )
                }

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

export default Start_Quiz