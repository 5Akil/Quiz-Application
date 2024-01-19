
import React from 'react'
import { Modal, Button } from "react-bootstrap";
import styled from 'styled-components';


const TImes_Up = ({ show ,handleSubmit }) => {

    return (
       
        <Modal show={show}  backdrop="static">
          
            <div style={{ backgroundImage: "linear-gradient(to right, rgb(115, 134, 213), rgb(179, 147, 211))", color: "white" }} >
                <h2 className="card-title  mt-3 ps-3 text-center" >Oops Time is Up!!!!!!!!</h2>
            </div>
            <Modal.Body><div className='card-body text-center'><i className="fas fa-history " style={{ fontSize: "10rem", color: "rgb(115, 134, 213)" }}></i></div></Modal.Body>
            <div className="card-footer d-flex justify-content-center align-items-center">
            <Btn>
                <button className="btn btn-primary submit_btn ms-3" onClick={handleSubmit} >Okay</button>
            </Btn>
           </div>
        </Modal>
    )
}

export default TImes_Up;


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