import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// import GoogleLogin from "react-google-login"



const GoogleOAuth = () => {
  const navigate = useNavigate();
  console.log(process.env.REACT_APP_BASE_URL);

  const handleSuccess = async (response) => {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}googlelogin`, response)
    const { data: info } = data
    const { access_token, refresh_token, user } = info

    if ('designation' in user && 'DOB' in user) {
      console.log("has designation");
      navigate('/userdashboard')
    } else {
      navigate('/required')

    }
    // if (data?.status === "success") {
    //   localStorage.setItem("access_token", data.access_token)
    //   localStorage.setItem("refresh_token", data.refresh_token)


    //   navigate('/userdashboard')
    //   toast.success('Logged in successfully.')
    // }
  }
  return (

    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  )
}

export default GoogleOAuth;