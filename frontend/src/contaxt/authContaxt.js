import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useHistory } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [accessToken, setAccessToken] = useState(null)
    const [refreshToken ,setRefreshToken] =useState(null)
    const [user , setUser]=useState(null)
    const [isLoading ,setIsLoading]=useState(true)

    const loginUser = async (values) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}userlogin `, values)
        const { data } = response

        if (data?.status === "success") {
          localStorage.setItem("access_token", data.access_token)
          localStorage.setItem("refresh_token", data.refresh_token)
          setAccessToken(data.access_token)
          setRefreshToken(data.refresh_token)
          setUser(data?.userInfo)
        }
        else if (data?.status === "not-registered") {
          toast.error("You are not a Registered User , First Sign Up")
        } else if (data?.status === "failed") {
          toast.error("Email or Password is Invalid")
        }
      }
      useEffect(()=>{
        if(accessToken !== null && refreshToken!== null && user!==null){
          navigate('/userdashboard')
          setIsLoading(false)
           toast.success('Logged in successfully.')
        }
      },[accessToken])


     

      let contextData = {
        accessToken: accessToken,
        setAccessToken: setAccessToken,
        loginUser: loginUser,
        user:user,
        isLoading:isLoading
        
    }

    return (
        <AuthContext.Provider value={contextData} >
            { children}
        </AuthContext.Provider>
    )
}
export default AuthContext;