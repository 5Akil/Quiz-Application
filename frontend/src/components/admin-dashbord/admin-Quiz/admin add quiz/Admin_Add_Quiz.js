import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useAddQuizMutation, useGetAllQuizQuery } from '../../../../services/quizApi'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import CheckBox from './CheckBox';
import QuestionsCheckBoxes from './QuestionsCheckBoxes';
import QuizCheckBox from './QuizCheckBox';

function Admin_Add_Quiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [selectedQuestionsId, setSelectedQuestionsId] = useState([])
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [checkedBox, setCheckedBox] = useState({})
  const [questionsCheckedBox, setQuestionsCheckedBoxes] = useState({})
  const [chooseQuestion, setChooseQuestion] = useState([])
  const [addQuiz] = useAddQuizMutation();
  const { data } = useGetAllQuizQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title) {
      const body = { title: title, questions: selectedQuestionsId, totalTime: totalTime }
      const response = await addQuiz(body);
      if (response.data.status === "success") {
        toast.success("Quiz Added Successfully")
        navigate('/admindashboard/admin-quiz/admin-view-quiz')
      }
    } else {
      toast.error("Fill the fields")
    }
  }
  const handleChange = (e) => {
    const { name, checked } = e.target;

    if (name === 'all') {
      // If 'All' checkbox is selected, deselect all other checkboxes
      const newCheckedBox = { all: checked };
      setCheckedBox(newCheckedBox);
    } else {
      // If any other checkbox is selected, deselect the 'All' checkbox
      const newCheckedBox = { ...checkedBox, all: false };
      newCheckedBox[name] = checked;
      setCheckedBox(newCheckedBox);
    }
  };

  const handleQuestions = (e) => {
    const { id, checked } = e.target
    setQuestionsCheckedBoxes({ ...questionsCheckedBox, [id]: checked })
  }

  return (
    <Wrapper>
      <div className='container'>
        <div className='card'>
          <div style={{ backgroundImage: "linear-gradient(to right, rgb(115, 134, 213), rgb(179, 147, 211))", color: "white" }}>
            <h2 className="card-title text-center mt-3" >ADD QUIZ</h2>
          </div>
          <div className='card-body'>
            <form method="POST" autoComplete="off" style={{ marginTop: "0px" }} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input className='form-control mb-3' name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Javascript' />
                <label htmlFor="question_number">Select topic </label>
                <div className="dropdown show">
                  <div className=" form-control w-100 text-left mb-3 d-flex " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" value='select Topic'>
                    Select Topic <i className="fas fa-caret-down down"></i>
                  </div>
                  <div className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                    <ul className='list-inline'>
                      <li className='ms-3' >
                        <CheckBox
                          id="all"
                          name='all'
                          handleChange={handleChange}
                          chooseQuestion={chooseQuestion}
                          setChooseQuestion={setChooseQuestion}
                          checked={checkedBox['all'] || false}
                        />
                      </li>
                      <li className='ms-3' >
                        <CheckBox
                          id="default"
                          name='default'
                          handleChange={handleChange}
                          chooseQuestion={chooseQuestion}
                          setChooseQuestion={setChooseQuestion}
                          checked={checkedBox['default'] || false}
                        />
                      </li>
                      {data?.quizList?.map((item) => {
                        return (
                          <li className='ms-3' key={item._id}>
                            <CheckBox
                              id={item._id}
                              name={item.title}
                              handleChange={handleChange}
                              chooseQuestion={chooseQuestion}
                              setChooseQuestion={setChooseQuestion}
                              checked={checkedBox[item.title] || false}
                            />
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
                <div className="form-group">
                  <label >Choose Questions</label>
                  <div className="scrollable-container">
                    <div className='p-2'>
                      <ul className='list-inline'>
                        {chooseQuestion?.map((item, index) => {
                          index++
                          return (
                            <li className='ms-3' key={item._id} >
                              <QuestionsCheckBoxes
                                // detail={item}
                                id={item._id}
                                index={index}
                                question={item.question}
                                checked={questionsCheckedBox[item._id] || false}
                                handleQuestions={handleQuestions}
                                selectedQuestions={selectedQuestions}
                                setSelectedQuestions={setSelectedQuestions}
                                selectedQuestionsId={selectedQuestionsId}
                                setSelectedQuestionsId={setSelectedQuestionsId}
                              />
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div> <div className="form-group">
                  <label >Selected Questions</label>
                  <div className="scrollable-container">
                    <div className='p-2'>
                      <ul className='list-inline'>
                        {selectedQuestions?.map((item, index) => {
                          index++
                          return (
                            <li className='ms-3' key={item}>
                              <label >
                                <p> {index} . {item}</p>
                              </label>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <label >Total Time</label>
                <input type='time' className='form-control mb-3' name='totalTime' step='1' value={totalTime} onChange={(e) => setTotalTime(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary submit_btn" >ADD</button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Admin_Add_Quiz;


const Wrapper = styled.div`
@import url("https://cdn.syncfusion.com/ej2/material.css");
padding-top:100px;

.submit_btn {
  padding:10px 20px;
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
.time-picker-container {
  width: 200px;
  margin: 0 auto;
}

.custom-time-picker {
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  outline: none;
}

.custom-time-picker:focus {
  border-color: blue;
}
ul{
  list-style: none;
}
.scrollable-container {
  width: 100%; 
  height: 200px; 
  overflow: auto;
  border: 1px solid #ccc;
}
button{
  border: 1px solid rgba(0,0,0,.15)
}
.down{
  margin-left:auto;
}
li:focus{
  color: #495057;
  border-color: #80bdff;
  outline: 0;
}


`

