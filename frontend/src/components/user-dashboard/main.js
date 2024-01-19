import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HeaderContainer } from '../../styling/Header.styled';
import { getUser } from '../../services/axios/apiCall/userApi';

const User_Dashboard = () => {

  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const getInfo = async () => {
    let response = await getUser()
    setUser(response?.data?.user);
    setIsLoading(false)
  }
  useEffect(() => {
    getInfo()
  }, [])

  const logoutUser = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    toast.success("Logged Out")
  }
  return (
    <div>
      <HeaderContainer>
        {!isLoading ? (
          <>

            <input type="checkbox" id="check" />
            <header>
              {/* navbar */}
              <label htmlFor="check">
                <i style={{ left: "20px", marginTop: "20px" }} className="fas fa-bars" id="sidebar_btn"></i>
              </label>
              <div className="left_area">
                <h3>Online Quiz</h3>
              </div>
              <div className="right_area">
                <Link to={'/'} onClick={logoutUser} className="logout_btn"><i className="fas fa-sign-out-alt"></i></Link>
              </div>
            </header>

            {/* sidebar */}
            <div className="sidebar">
              <center>

                <img className="profile_image"  src={ user?.authBy === 'Google' ?  user?.image  :  `${process.env.REACT_APP_SERVER}/${user?.image}` } alt="" />
                <h4>{`${user?.firstName} ${user?.lastName}`}</h4>
                <h6 >( {user?.designation} )</h6>

              </center>

              <Link className='link' to=''><i className="fas fa-tachometer-alt "></i><span>Dashboard</span></Link>
              <Link className='link' to="quiz-list"><i className="fas fa-book"></i><span>Quiz</span></Link>
              <Link className='link' to={`result`} ><i className="fas fa-sort-numeric-up "></i><span>Result</span></Link>
            </div>
            <div className='content'>
              <Outlet />
            </div>
          </>

        ) : null}
      </HeaderContainer>

    </div>
  )
}

export default User_Dashboard

