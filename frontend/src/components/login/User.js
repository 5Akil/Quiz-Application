import React from 'react';
import Navbar from '../common/Navbar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function User() {
    return (
        <>
            <Navbar />
            <Wrapper>
                <div className="jumbotron  text-center align-items-center " >
                    <h1 className="display-4">Hello, User</h1>
                    <p className="lead">Welcome to Online Quiz</p>
                    <hr className="my-4" />
                    <p>You can access various features after Login.</p>
                    <p className="lead">
                        <Link className="btn btn-primary btn-lg m-2" to="/user/usersignup" role="button">Create Your Account</Link>
                        <Link className="btn btn-primary btn-lg m-2" to="/user/userlogin" role="button">Login</Link>
                    </p>
                </div>
            </Wrapper>
        </>
    )
}
export default User

const Wrapper = styled.div`
.jumbotron {
    padding: 5rem 1rem;
    background-color: #e9ecef;
    border-radius: .3rem;
    height: 100vh;
}
   
`


