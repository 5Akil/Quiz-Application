import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import { useGetAllQuizQuery } from '../../../services/quizApi';
import { getAllQuiz } from '../../../services/axios/apiCall/quizApi';
import { PuffLoader } from 'react-spinners';

function Quiz_List() {
    const [quiz, setQuiz] = useState(null)
    // const { data } = useGetAllQuizQuery();
    const getQuiz = async () => {
        const quiz = await getAllQuiz()
        setQuiz(quiz);
    }
    useEffect(() => {
        getQuiz()
    }, [])

    return (
        quiz !== null ? (
            <Wrapper>
                <h1 >Available Quizzes</h1>
                <div className="container d-flex justify-content-center">
                    {
                        quiz?.length === 0 ? (
                            <div className='d-flex justify-content-center align-items-center' style={{ height: "200px", color: "grey" }} >
                                <h3>
                                    There is not any Quiz Right Now
                                </h3>
                            </div>
                        ) : (
                            <>
                                <ul className="list-group  text-white">
                                    {quiz?.map((item) => {
                                        return (
                                            <Link to={`${item._id}`} style={{ textDecoration: "none" }} key={item._id}>
                                                <li className="list-group-item d-flex justify-content-between align-content-center" >
                                                    <div className='d-flex align-items-center w-100'>
                                                        <div className='left d-flex align-items-center'>
                                                            <h6 className='d-inline mb-0 ms-2'>{item.title}</h6>
                                                        </div>
                                                        <p className='mb-0'>Total Questions : {item.questions.length}</p>
                                                    </div>
                                                </li>
                                            </Link>
                                        )
                                    })}
                                </ul>
                            </>
                        )}
                </div>
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

export default Quiz_List


const Wrapper = styled.div`
padding-top:100px;
.right{
    flex:30%;
}
.left{
    flex:70%;
}

.list-group{
	width: 90% !important;
}

.list-group-item{
	margin-top:10px;
	border-radius: none; 
    color: white;
	background: rgb(115, 134, 213);
	cursor: pointer;
	transition: all 0.3s ease-in-out;
}

h1{
    background-image: linear-gradient(to right, rgb(115, 134, 213), rgb(179, 147, 211));
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    text-align: center;
}


.list-group-item:hover{
	transform: scaleX(1.1);
}

.list-group-item:hover {
	opacity: 1;

}

.about span{
	font-size: 12px;
	margin-right: 10px;

}

    

`