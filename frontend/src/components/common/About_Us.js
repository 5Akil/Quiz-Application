import React from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function About_Us() {
    return (
        <>
            <Navbar />
            <Wrapper>

                <div className="container d-flexflex-column align-items-center">
                    <center>
                    <h3 className='alert alert-success' style={{ marginBottom: "0px" }}>About Us !</h3>
                    </center>
                    <div className="jumbotron" style={{ marginBottom: "0px", marginTop: "0px" }}>

                        <p className="lead">We Provide Platform For Students To practice Questions  <br /> Teacher can add course/exam to System and Questions to that course.</p>
                        <hr className="my-4" />
                        <p>Explore our Website.</p>
                        <p >
                            <Link className='btn btn-lg  text-center home-btn' to="/" >HOME</Link>
                        </p>
                    </div>
                </div>
            </Wrapper>
            <Footer />
        </>
    )
}

export default About_Us


const Wrapper = styled.div`
padding-top : 80px;
height: 100vh;
background-image: linear-gradient(to bottom right, #E1BEE7, #B2EBF2);

.home-btn {
    border-radius: 30px;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    background-color: rgb(115, 134, 213);
    border: none;
    color: white;
    margin-top: 20px;

}

`
