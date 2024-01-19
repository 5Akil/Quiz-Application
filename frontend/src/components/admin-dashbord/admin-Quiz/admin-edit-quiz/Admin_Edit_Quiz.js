import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { useEditQuizMutation, useGetQuizQuery } from '../../../../services/quizApi';



function Admin_Edit_Quiz(props) {
    const id = props.id;
    const [editQuiz] = useEditQuizMutation();
    const [data, setData] = useState();
    
    const { data: response } = useGetQuizQuery(id);
    useEffect(() => { 
        if (response) {
            setData(response?.quiz)
        }
    }, [response])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.title !== response?.quiz?.title ||  data.totalTime !== response?.quiz?.totalTime) {
            await editQuiz({ id, ...data })
            props.onHide()
            props.refetch() 
            toast.success("Quiz Updated Successfully")
        }
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })
    }
    return (
        <>
            <Modal {...props} size="lg">
                <div className='card'>
                    <div style={{ backgroundImage: "linear-gradient(to right, rgb(115, 134, 213), rgb(179, 147, 211))", color: "white" }} className='d-flex justify-content-between align-items-center'>
                        <h2 className="card-title  mt-3 ps-3" >Edit Quiz</h2>
                        <i className="fas fa-times   pe-3" onClick={props.onHide} style={{ fontSize: "25px", cursor: "pointer" }}></i>
                    </div>
                    <div className='card-body'>
                        <form method="POST" autocomplete="off" style={{ marginTop: "0px" }} onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input className='form-control mb-3' name='title' value={data?.title} onChange={handleChange} />
                                <label htmlFor="total_Time">Total Marks</label>
                                <input type='time' step='1' className='form-control mb-3' name='totalTime' value={data?.totalTime} onChange={handleChange} />
                            </div>
                            <Btn>
                                <button type="submit" className="btn btn-primary submit_btn" >Save Changes </button>
                                <button type="button" className="btn btn-primary submit_btn ms-3" onClick={() => props.onHide()}>Close </button>
                            </Btn>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Admin_Edit_Quiz

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