import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '../../common/Navbar'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdminLoginMutation } from '../../../services/adminApi'
import Footer from '../../common/Footer';
import { useFormik } from 'formik';
import { loginSchema } from '../../../validationSchemas/loginSchema';



function Admin_Login() {
  const navigate = useNavigate();


  const [adminLogin, { data, isSuccess }] = useAdminLoginMutation()   // admin login query hook

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {

      await adminLogin(values);    // a callback function for fire a admin login query 
      action.resetForm();
    }


  })

  useEffect(() => {
    if (data?.status === "success") {
      localStorage.setItem("admin_access_token", data.token)
      const access_token = localStorage.getItem("admin_access_token")
      if (access_token) {
        navigate("/admindashboard")
        toast.success('Logged in successfully.')
      }
    } else if (data?.status === "failed") {
      toast.error("Email or Password is invalid")
    }
  }, [isSuccess])

  return (
    <>
      <Navbar />
      <Wrapper>

        <div className="container d-flex justify-content-center align-items-center">
          <div className="login-form">

            <form className="box" method="post" onSubmit={handleSubmit}>
              <div className="form-icon">
                <span><i className="far fa-user"></i></span>
              </div>
              <h3 className='text-center mb-4' style={{ color: "rgb(115, 134, 213)" }}>Admin Login</h3>
              <div className="form-group">
                <input type='text' className='form-control item' name='email' onChange={handleChange} onBlur={handleBlur} placeholder='Email' value={values.email} />
                {errors.email && touched.email ? (
                  <p className="form-error" style={{ color: 'red', textAlign: "center", width: "300px" }}>{errors.email}</p>
                ) : null}
              </div>
              <div className="form-group">
                <input type='password' className='form-control item' name='password' onChange={handleChange} onBlur={handleBlur} placeholder='Password' value={values.password} />
              </div>
              {errors.password && touched.password ? (
                <p className="form-error" style={{ color: 'red', textAlign: "center", width: "300px" }}>{errors.password}</p>
              ) : null}
              <div className="form-group">
                <button type="submit" className="btn btn-block create-account">Log In</button>
              </div>
            </form>

          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  )
}
export default Admin_Login

const Wrapper = styled.div`

padding-top : 80px;
background-image: linear-gradient(to bottom right, #E1BEE7, #B2EBF2);
.login-form{
padding: 50px 0;
}

.login-form form{
  background-color: #fff;
  max-width: 600px;
  margin: 30px auto auto;
  padding: 30px 50px;
  border-radius: 30px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}

.login-form .form-icon{
text-align: center;
  background-color: rgb(115, 134, 213);
  border-radius: 50%;
  font-size: 40px;
  color: white;
  width: 100px;
  height: 100px;
  margin: auto;
  margin-bottom: 30px;
  line-height: 100px;
}

.login-form .item{
border-radius: 20px;
  margin-bottom: 20px;
  padding: 10px 20px;
}
.form-control:focus {
  border-color: rgb(115, 134, 213);
  box-shadow: 0 0 0 0.2rem  rgb(115, 134, 213 , 0.25);
} 

.login-form .create-account{
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  background-color: rgb(115, 134, 213);
  border: none;
  color: white;
  margin-top: 20px;
}

.login-form .social-media{
  max-width: 600px;
  background-color: #fff;
  margin: auto;
  padding: 35px 0;
  text-align: center;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  color: #9fadca;
  border-top: 1px solid #dee9ff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}

.login-form .social-icons{
  margin-top: 30px;
  margin-bottom: 16px;
}

.login-form .social-icons a{
  font-size: 23px;
  margin: 0 3px;
  color: #5691ff;
  border: 1px solid;
  border-radius: 50%;
  width: 45px;
  display: inline-block;
  height: 45px;
  text-align: center;
  background-color: #fff;
  line-height: 45px;
}

.login-form .social-icons a:hover{
  text-decoration: none;
  opacity: 0.6;
}

@media (max-width: 576px) {
  .login-form form{
      padding: 50px 20px;
  }

  .login-form .form-icon{
      width: 70px;
      height: 70px;
      font-size: 30px;
      line-height: 70px;
  }
}
`