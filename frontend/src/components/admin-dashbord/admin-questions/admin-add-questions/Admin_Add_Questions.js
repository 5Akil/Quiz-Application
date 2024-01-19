import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components'
import { useAddQuestionMutation ,useGetAllQuizQuery } from '../../../../services/quizApi';


function Admin_Add_Questions() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState({});
  const [marks, setMarks] = useState();
  const [correct, setCorrect] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value
    setOptions({ ...options, [name]: value })
  }

  const { data } = useGetAllQuizQuery();                
  const [addQuestion] = useAddQuestionMutation()       //query htmlFor adding new question


  //post new question's details using query to the server

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (id && question && options && marks && correct) {

      const body = {
        id, question, options, marks, correct
      }
      const response = await addQuestion(body).unwrap();
      console.log(response);

      if (response.status === "success") {
        toast.success("Question Added Successfully")
        navigate("/admindashboard/admin-questions/view-questions")
      }
    } else {
      toast.error("Fill the Fields")
    }

  }
  return (
    <Wrapper>
      <div className='container' style={{ paddingTop: "85px" }}>
        <div className='card'>
          <div style={{ backgroundImage: "linear-gradient(to right, rgb(115, 134, 213), rgb(179, 147, 211))", color: "white" }}>
            <h2 className="card-title text-center mt-3" >ADD QUESTION</h2>
          </div>
          <div className='card-body'>
            <form method="POST" autoComplete="off" style={{ margin: "20px" }} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="question">Course</label>
                <select name="title" className='form-control' style={{ height: "40px" }} onC hange={(e) => setId(e.target.value)}   >
                  <option >----Select Quiz----</option>
                  {data?.quizList?.map((item) => {
                    return (
                      <option key={item._id} name={item.title} value={item._id} >{item.title}</option>
                    )
                  })}
                </select>
                <br />
                <label htmlFor="question">Question</label>
                <input className='form-control' name='question1' value={question} onChange={(e) => setQuestion(e.target.value)} />
                <br />
                <label htmlFor="question_number">Marks</label>
                <input className='form-control' type='number' min={1} onChange={(e) => setMarks(e.target.value)} />
                <br />
                <label htmlFor="option1">Option 1</label>
                <input className='form-control' name='option1' id='option1' onChange={handleChange} />
                <br />
                <label htmlFor="option2">Option 2</label>
                <input className='form-control' name='option2' id='option2' onChange={handleChange} />
                <br />
                <label htmlFor="option3">Option 3</label>
                <input className='form-control' name='option3' id='option3' onChange={handleChange} />
                <br />
                <label htmlFor="option4">Option 4</label>
                <input className='form-control' name='option4' id='option4' onChange={handleChange} />
                <br />

                <select name="answer" className='form-control' style={{ height: "40px" }} onChange={(e) => setCorrect(e.target.value)}   >
                  <option >----Select Answer----</option>
                  <option name="option1" value={options.option1}>option1</option>
                  <option name="option2" value={options.option2}>option2</option>
                  <option name="option3" value={options.option3}>option3</option>
                  <option name="option4" value={options.option4}>option4</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary mb-3 submit_btn">ADD</button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Admin_Add_Questions


const Wrapper = styled.div`
height:100vh;

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
`

