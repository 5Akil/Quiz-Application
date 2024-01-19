import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useGetAdminQuery } from '../../services/adminApi'
import { HeaderContainer } from '../../styling/Header.styled'


function Admin_Dashboard() {
 
  const {data ,isLoading}= useGetAdminQuery();
  const logoutAdmin = () => {
    localStorage.removeItem('admin_access_token')
    toast.success("Logged Out")
  }

  return (
    <div>
      <HeaderContainer>
        {!isLoading ?

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
                <Link onClick={logoutAdmin} to="/" className="logout_btn"><i className="fas fa-sign-out-alt"></i></Link>
              </div>
            </header>

            {/* sidebar */}
            <div className="sidebar">
              <center>

                <img className="profile_image" src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' alt="" />
                <h4>
                  {`${data?.admin?.firstName} ${data?.admin?.lastName}`}
                  {/* hello */}
                </h4>
                <h6 >( Admin )</h6>

              </center>

              <Link className='link' to=""><i className="fas fa-tachometer-alt"></i><span>Dashboard</span></Link>
              <Link className='link' to="users"><i className="fas fa-user-graduate"></i><span>Users</span></Link>
              <Link className='link' to="admin-quiz"><i className="fas fa-book"></i><span>Add Quiz</span></Link>
              <Link className='link' to="admin-questions"><i className="fas fa-question-circle"></i><span>Questions</span></Link>
            </div>

            {/* content body */}

            <div className='content'>
              <Outlet />
            </div>
          </>

          : null}
      </HeaderContainer>


    </div>
  )
}

export default Admin_Dashboard
