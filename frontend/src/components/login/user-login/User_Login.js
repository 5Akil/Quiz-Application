import Navbar from '../../common/Navbar'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { loginSchema } from '../../../validationSchemas/loginSchema';
import { useFormik } from 'formik';
import Footer from '../../common/Footer';
import AuthContext from '../../../contaxt/authContaxt';
// import GoogleOAuth from '../Google_login/Google_Auth';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import Required from './Required';

function User_Login() {
  console.log(`${process.env.REACT_APP_BASE_URL}googlelogin`);
  // let { loginUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [googledata, setGoogleData] = useState(null)
  const [required, setRequired] = useState(false)
  const initialValues = {
    email: '',
    password: ''
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {

        await loginUser(values)
        action.resetForm();
      }
    })

  const loginUser = async (values) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}userlogin `, values)
    const { data } = response

    if (data?.status === "success") {
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("refresh_token", data.refresh_token)
      setAccessToken(data.access_token)
      setRefreshToken(data.refresh_token)
    }
    else if (data?.status === "not-registered") {
      toast.error("You are not a Registered User , First Sign Up")
    } else if (data?.status === "failed") {
      toast.error("Email or Password is Invalid")
    }
  }
  useEffect(() => {
    if (accessToken !== null && refreshToken !== null) {
      navigate('/userdashboard')
      toast.success('Logged in successfully.')
    }
  }, [accessToken])

  const handleSuccess = async (response) => {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}googlelogin`, response)
    console.log(data);
    setGoogleData(data?.data)
  }
  useEffect(() => {
    if (googledata !== null) {
      if ('designation' in googledata?.user && 'DOB' in googledata?.user) {
        localStorage.setItem("access_token", googledata?.access_token)
        localStorage.setItem("refresh_token", googledata?.refresh_token)
        setAccessToken(googledata.access_token)
        setRefreshToken(googledata.refresh_token)
      } else {
        setRequired(true)
      }
    }

  }, [googledata])

  return (
    <>
      <Wrapper>
        <Navbar />
        <div className="container d-flex justify-content-center align-items-center h-100">
          <div className="login-form">
            {
              !required ?
                <>
                  <form className="box mb-5" method="post" onSubmit={handleSubmit}>
                    <div className="form-icon">
                      <span><i className="far fa-user"></i></span>
                    </div>
                    <h3 className='text-center mb-4' style={{ color: "rgb(115, 134, 213)" }}>User Login</h3>
                    <div className="form-group">
                      <input type='text' className='form-control item' name='email' onChange={handleChange} onBlur={handleBlur} placeholder='Email' value={values.email} />
                      {errors.email && touched.email ? (
                        <p className="form-error" style={{ color: 'red', textAlign: "center", width: "300px" }}>{errors.email}</p>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <input type='password' className='form-control item' name='password' onChange={handleChange} onBlur={handleBlur} placeholder='Password' value={values.password} />
                      {errors.password && touched.password ? (
                        <p className="form-error" style={{ color: 'red', textAlign: "center", width: "300px" }}>{errors.password}</p>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-block login-account">Log In</button>
                    </div>
                    <p className="text-center text-muted mt-3 mb-0">Didn't have an account?
                      <Link to="/user/usersignup" className="fw-bold  ms-3" style={{ color: "rgb(115, 134, 213)" }}><u>Signup here</u></Link></p>
                    <p className="text-center text-muted mt-2 mb-0">Forgot Password?
                      <Link to="/user/reset-password-email" className="fw-bold  ms-3" style={{ color: "rgb(115, 134, 213)" }}><u>Reset here</u></Link></p>
                    <div className='ms-5 mt-3'>
                      <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={() => {
                          console.log('Login Failed');
                        }}
                      />
                    </div>
                  </form>
                </>
                :
                <Required user={googledata?.user} accessToken={googledata?.access_token} refreshToken={googledata?.refresh_token} />
            }

          </div>
        </div>
        <Footer />
      </Wrapper>

    </>
  )
}

export default User_Login


const Wrapper = styled.div`
padding-top : 80px;
height: 100vh;
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
