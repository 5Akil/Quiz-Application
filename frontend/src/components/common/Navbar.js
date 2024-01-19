import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';


function Navbar() {
    return (
        <Wrapper>
            <nav className="navbar navbar-expand-lg navbar-dark  " style={{ backgroundColor: 'rgb(115, 134, 213)' }}>
                <Link className='navbar-brand' href="/">Online Quiz</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/" className="nav-item nav-link ">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/userlogin" className="nav-item nav-link">Log In</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/about-us" className="nav-item nav-link">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-item nav-link">Contact Us</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </Wrapper>
    )
}
const Wrapper = styled.div`
  .navbar{
    position: fixed;
    top:0;
    width: 100%;
    z-index:1000;
  }
`

export default Navbar