import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { useEditUserMutation, useGetSIngleUserQuery } from '../../../../services/userApi';


function Edit_User(props) {
    
    const id = props.id;
    const [firstName ,setFirstName]=useState(); 
    const [lastName , setLastName] =useState();
    const [email , setEmail]=useState();
    const [designation , setDesignation]=useState();

    const {data:user} = useGetSIngleUserQuery(id);  //get user's existing details from database 
    
    //set existing Data 
    useEffect(()=>{
        if(user){
           setEmail(user?.email);
           setFirstName(user?.firstName);
           setLastName(user?.lastName);
           setDesignation(user?.designation);

        }
    },[user])

    //new data
    const [data, setData] = useState({});
    const [editUser] = useEditUserMutation();   

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email!==data.email ||firstName!== data.firstName || lastName!== data.lastName ||designation!== data.designation){
            await editUser({ id, ...data })
            props.onHide()
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
                    <div style={{backgroundImage: "linear-gradient(to right, rgb(115, 134, 213), rgb(179, 147, 211))" , color: "white"}} className='d-flex justify-content-between align-items-center'>
                        <h2 className="card-title  mt-3 ps-3" >Edit User</h2>
                        <i className="fas fa-times   pe-3" onClick={props.onHide} style={{ fontSize: "25px", cursor: "pointer" }}></i>
                    </div>
                    <div className='card-body'>
                        <form method='POST' autocomplete="off" style={{ marginTop: "0px" }} onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="title">First Name</label>
                                <input className='form-control mb-3' name='firstName' value={firstName} onChange={handleChange} />

                                <label for="question_number">Last Name</label>
                                <input className='form-control mb-3' name='lastName' value={lastName} onChange={handleChange} />

                                <label for="total_marks">Email</label>
                                <input className='form-control mb-3' name='email' value={email} onChange={handleChange} />

                                <label for="total_marks">Designation</label>
                                <input className='form-control mb-3' name='designation' value={designation} onChange={handleChange} />
                            </div>
                            <Btn>
                                <button type='submit' className="btn btn-primary submit_btn"  >Save Changes </button>
                                <button className="btn btn-primary submit_btn ms-3" onClick={props.onHide}>Close </button>
                            </Btn>
                        </form>
                    </div>
                </div>


            </Modal>
        </>
    )
}

export default Edit_User


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