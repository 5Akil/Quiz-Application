import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useEditQuestionMutation,  useGetSingleQuestionQuery } from '../../../../services/quizApi';

function Admin_Edit_Question(props) {

    const id = props.id;
    
    const [question, setQuestion] = useState();
    const [options, setOptions] = useState();
    const [marks, setMarks] = useState();
    const [answer, setAnswer] = useState();

    const [editQuestion] = useEditQuestionMutation();       //query htmlFor edit existing question
    const {data} = useGetSingleQuestionQuery(id);           //get existing question's details htmlFor edit       

   //set existing Data to the input
    useEffect(()=>{
        if(data){
            setQuestion(data?.question)
            setOptions(data?.options)
            setMarks(data?.marks)
            setAnswer(data?.answer)
        }
    },[data])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setOptions({ ...options, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const body = {
            question, options, marks, answer
        }
        
        if (question !==data?.question || options !== data?.options || marks!== data?.marks )  {
            const response = await editQuestion({ id, ...body })
            if (response.data.status === "success") {
                toast.success("Question Updated Successfully");
                props.onHide()
                props.refetch()  
            }
        }

    }

    return (
        <>
            <Modal {...props} size="lg">

                <div className='card'>
                    {/* <Modal.Header> */}
                    <div style={{ backgroundImage: "linear-gradient(to right, rgb(115, 134, 213), rgb(179, 147, 211))", color: "white" }}className='d-flex justify-content-between align-items-center' >
                        <h2 className="card-title  mt-3 ps-3" >Edit Question</h2>
                        <i className="fas fa-times   pe-3" onClick={props.onHide} style={{ fontSize: "25px", cursor: "pointer" }}></i>
                    </div>
                    {/* </Modal.Header> */}
                    <div className='card-body'>
                        <form method="POST" autoComplete="off" style={{ marginTop: "0px" }} onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="question">Question</label>
                                <input className='form-control' name='question' value={question} onChange={(e) => setQuestion(e.target.value)} />
                                <br />
                                <label htmlFor="question_number">Marks</label>
                                <input className='form-control' type='number' value={marks} name='mark' min={0} onChange={(e) => setMarks(e.target.value)} />
                                <br />
                                <label htmlFor="option1">Option 1</label>
                                <input className='form-control' name='option1' value={options?.option1} onChange={handleChange} />
                                <br />
                                <label htmlFor="option2">Option 2</label>
                                <input className='form-control' name='option2' value={options?.option2} onChange={handleChange} />
                                <br />
                                <label htmlFor="option3">Option 3</label>
                                <input className='form-control' name='option3' value={options?.option3} onChange={handleChange} />
                                <br />
                                <label htmlFor="option4">Option 4</label>
                                <input className='form-control' name='option4' value={options?.option4} onChange={handleChange} />
                                <br />

                                <select name="answer" className='form-control' style={{ height: "40px" }} onChange={(e) => setAnswer(e.target.value)} >
                                    <option >----Select Answer----</option>
                                    <option name="option1">option1</option>
                                    <option name="option2">option2</option>
                                    <option name="option3">option3</option>
                                    <option name="option4">option4</option>
                                </select>

                            </div>
                            <Btn>
                                <button type="submit" className="btn btn-primary submit_btn" >Save Changes </button>
                                <button className="btn btn-primary submit_btn ms-3" onClick={props.onHide}>Close </button>
                            </Btn>
                        </form>
                    </div>
                </div>


            </Modal>
        </>
    )
}

export default Admin_Edit_Question


const Btn = styled.div`
margin-top : 20px;
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