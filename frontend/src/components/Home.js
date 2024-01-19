import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Navbar from './common/Navbar';
import Footer from './common/Footer.js';



function Home() {
    return (
        <>
            <Wrapper>
                <Navbar />
                <section id="section-jumbotron" className="jumbotron jumbotron-fluid d-flex justify-content-center align-items-center mb-0">
                    <div className="container text-center">
                        <h1 className="display-3 ">Let's Quiz</h1>
                        <p className="display-4 d-none d-sm-block">Test your skills and become a master.</p>
                        <p className="lead">We organize quizzes on various topics.</p>
                        <p className="lead">Sign up if you haven't already and get access to millions of quizzes on the topic of your interest.</p>
                        <p><strong> Start Your Journey Here:</strong></p>
                        <Link to="/user/usersignup" className="btn btn-lg btn-info text-center signup_btn "><i className="fa fa-user-plus" aria-hidden="true"></i> Sign Up</Link>
                    </div>
                </section>
                <Footer/>
            </Wrapper>
        </>
    )
}

export default Home


const Wrapper = styled.div`

#section-jumbotron {
    padding: 2rem 1rem;
    background-image: linear-gradient(to bottom right, #E1BEE7, #B2EBF2);
    border-radius: .3rem;
    height: 100vh;
}
h1 {
    background-image: linear-gradient(to right, rgb(115, 134, 213), rgb(179, 147, 211));
    color: transparent;
    background-clip: text;
    text-align: center;
    -webkit-background-clip: text;
}

.signup_btn{
    border-radius: 30px;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  background-color: rgb(115, 134, 213);
  border: none;
  color: white;
  margin-top: 20px;
}

`;