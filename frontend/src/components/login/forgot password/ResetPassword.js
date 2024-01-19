import React, { useEffect, useState } from 'react'
import Navbar from '../../common/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useResetPasswordMutation } from '../../../services/userApi';
import { toast } from 'react-toastify';
import { resetSchema } from '../../../validationSchemas/loginSchema';
import { useFormik } from 'formik';
import Footer from '../../common/Footer';

function ResetPassword() {
    const navigate = useNavigate();

    const { token } = useParams();

    //update new password

    const [resetPassword, { data, isSuccess }] = useResetPasswordMutation();
    console.log(data);


    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: { newPassword: '', confirmPassword: '' },
        validationSchema: resetSchema,
        onSubmit: async (values, action) => {
            const body = values;
            await resetPassword({ token, body })
            action.resetForm();
        }
    })

    useEffect(() => {
        if (data?.status === "success") {
            toast.success("Password Reset Successfully")
            navigate('/userlogin')
        }else if (data?.status ==="same-password"){
            toast.error("Use different Password then earlier")
        }else if (data?.status === "Expired Token"){
            toast.error("Link expired ")
        }
    }, [isSuccess])

    return (
        <>
            <Navbar />
            <Wrapper>

                <div className="container d-flex justify-content-center align-items-center">
                    <div className="reset-form">

                        <form className="box" method="post" onSubmit={handleSubmit}>
                            <div className="form-icon">
                                <span><i className="far fa-user"></i></span>
                            </div>
                            <h3 className='text-center mb-4' style={{ color: "rgb(115, 134, 213)" }}>Reset Your Password</h3>
                            <div className="form-group">
                                <input type='password' className='form-control item' name='newPassword' placeholder='Enter Your New Password' onChange={handleChange} onBlur={handleBlur} value={values.newPassword} />
                                {errors.newPassword && touched.newPassword ? (
                                    <p className="form-error" style={{ color: 'red', textAlign: "center", width: "300px" ,wordWrap: "break-word" }}>{errors.newPassword}</p>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <input type='password' className='form-control item' name='confirmPassword' placeholder='Confirm New Password' onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} />
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <p className="form-error" style={{ color: 'red', textAlign: "center", width: "300px" }}>{errors.confirmPassword}</p>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-block reset-password">Reset</button>
                            </div>
                        </form>

                    </div>
                </div>
            </Wrapper>
            <Footer/>
        </>
    )
}

export default ResetPassword


const Wrapper = styled.div`
background-image: linear-gradient(to bottom right, #E1BEE7, #B2EBF2);
height: 100vh;
padding-top: 80px;
.reset-form{
    padding: 50px 0;
    }
    
    .reset-form form{
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
    .reset-form .form-icon{
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
    
    .reset-form .item{
    border-radius: 20px;
      margin-bottom: 20px;
      padding: 10px 20px;
    }
    
    .reset-password{
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
      .reset-form form{
          padding: 50px 20px;
      }
    
      .reset-form .form-icon{
          width: 70px;
          height: 70px;
          font-size: 30px;
          line-height: 70px;
      }
    }
`