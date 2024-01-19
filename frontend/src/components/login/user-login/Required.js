import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components'
import * as Yup from "yup";


function Required({ user, accessToken, refreshToken }) {
    const navigate = useNavigate()
    const requiredSchema = Yup.object({
        designation: Yup.string().trim().required("Please enter your Designation"),
        DOB: Yup.date().required("Please enter your DOB"),
    })

    const initialValues = {
        designation: '',
        DOB: '',
        country: '',
        state: '',
        city: '',

    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: requiredSchema,
            onSubmit: (values, action) => {
                googleLogin(values)
            }
        })

    const googleLogin = async (values) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}requiredfields/${user._id}`, values)

        console.log(response);
        if (response?.data?.status === 'success') {
            localStorage.setItem("access_token", accessToken)
            localStorage.setItem("refresh_token", refreshToken)
            navigate('/userdashboard')
            toast.success('Logged in successfully.')
        }

    }


    return (
        <>

            <form className="box" method="post" onSubmit={handleSubmit}>

                <h3 className='text-center mb-4' style={{ color: "rgb(115, 134, 213)" }}>Complete Registration</h3>
                <p style={{ color: '#868e96', textAlign: 'center' }}>
                    Welcome to our application! To get started, kindly provide the necessary details</p>
                <div className="form-group">
                    <input type='date' className='form-control item' name='DOB' value={values.DOB} placeholder='Date of Birth' onChange={handleChange} onBlur={handleBlur} />
                    {errors.DOB && touched.DOB ? (
                        <p className="form-error" style={{ color: 'red', textAlign: "center", width: "300px" }}>{errors.DOB}</p>
                    ) : null}
                </div>
                <div className="form-group">
                    <input type='text' className='form-control item' name='designation' value={values.designation} placeholder='Designation' onChange={handleChange} onBlur={handleBlur} />
                    {errors.designation && touched.designation ? (
                        <p className="form-error" style={{ color: 'red', textAlign: "center", width: "300px" }}>{errors.designation}</p>
                    ) : null}
                </div>
                <div className="d-md-flex justify-content-start align-items-center mb-3 py-2">
                    <h6 className="mb-0 me-4">Gender: </h6>
                    <div className="form-check form-check-inline mb-0 me-4" >
                        <input className="form-check-input" type="radio" name="gender" id="femaleGender"
                            value="Female" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="femaleGender" >Female</label>
                    </div>
                    <div className="form-check form-check-inline mb-0 me-4">
                        <input className="form-check-input" type="radio" name="gender" id="maleGender"
                            value="Male" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="maleGender">Male</label>
                    </div>
                    <div className="form-check form-check-inline mb-0">
                        <input className="form-check-input" type="radio" name="gender" id="otherGender"
                            value="Other" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="otherGender">Other</label>
                    </div>
                </div>
                {errors.gender && touched.gender ? (
                    <p className="form-error" style={{ color: 'red' }}>{errors.gender}</p>
                ) : null}
                
                <div className="form-group">
                    <button type="submit" className="btn btn-block login-account">Submit</button>
                </div>

            </form>

        </>
    )
}

export default Required

const Wrapper = styled.div`
padding-top : 80px;
height:100vh;
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
.form-control:focus {
  border-color: rgb(115, 134, 213);
  box-shadow: 0 0 0 0.2rem  rgb(115, 134, 213 , 0.25);
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

.login-account{
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




