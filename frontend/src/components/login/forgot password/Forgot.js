import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../../common/Navbar'
import { useSendEmailMutation } from '../../../services/userApi';
import { useFormik } from 'formik';
import { forgotSchema } from '../../../validationSchemas/loginSchema';
import { toast } from 'react-toastify';
import Footer from '../../common/Footer';

function Forgot() {

  const [sendEmail, { data, isSuccess }] = useSendEmailMutation();   // Reset Email Query Hook


  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: { email: '' },
    validationSchema: forgotSchema,
    onSubmit: async (values, action) => {

      action.resetForm();
      await sendEmail(values)

    }
  })
  useEffect(() => {
    if (data?.status === "success") {
      toast.success('Email send Successfully ,Please Check Your inbox')
    } else if (data?.status === "failed") {
      toast.error("User Not Found ")
    }
  }, [isSuccess])

  console.log(errors);

  return (
    <>
      <Navbar />
      <Wrapper>

        <div className="container d-flex justify-content-center align-items-center">
          <div className="forgot-form">

            <form className="box" method="post" onSubmit={handleSubmit}>
              <div className="form-icon">
                <span><i className="far fa-user"></i></span>
              </div>
              <h3 className='text-center mb-4' style={{ color: "rgb(115, 134, 213)" }}>Forgot Password</h3>
              <div className="form-group">
                <input type='text' className='form-control item' name='email' placeholder='Enter Your Email' onChange={handleChange} onBlur={handleBlur} value={values.email} />
                {errors.email && touched.email ? (
                  <p className="form-error" style={{ color: 'red', textAlign: "center", width: "300px" }}>{errors.email}</p>
                ) : null}
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-block forgot-account">Send</button>
              </div>
            </form>

          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  )
}

const Wrapper = styled.div`
background-image: linear-gradient(to bottom right, #E1BEE7, #B2EBF2);
height:100vh;
padding-top: 80px;
.forgot-form{
    padding: 50px 0;
    }
    
    .forgot-form form{
      background-color: #fff;
      max-width: 600px;
      margin: 30px auto auto;
      padding: 30px 50px;
      border-radius: 30px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
    }
    .form-control:focus {
      border-color: rgb(115, 134, 213);
      box-shadow: 0 0 0 0.2rem  rgb(115, 134, 213 , 0.25);
    } 
    .forgot-form .form-icon{
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
    
    .forgot-form .item{
    border-radius: 20px;
      margin-bottom: 20px;
      padding: 10px 20px;
    }
    
    .forgot-account{
      border-radius: 30px;
      padding: 10px 20px;
      font-size: 18px;
      font-weight: bold;
      background-color: rgb(115, 134, 213); 
      border: none;
      color: white;
      margin-top: 20px;
    }
    
    
    @media (max-width: 576px) {
      .forgot-form form{
          padding: 50px 20px;
      }
    
      .forgot-form .form-icon{
          width: 70px;
          height: 70px;
          font-size: 30px;
          line-height: 70px;
      }
    }
`
export default Forgot