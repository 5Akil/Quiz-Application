import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
// import AuthContext from '../../contaxt/authContaxt';


export const getRTKQuery = (url, method, body) => {
    // const access_token = useSelector((state)=> state.auth.access_token)
    const token = localStorage.getItem("admin_access_token")    
    return {
        url,
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body
    }
}
export const getNewAccesssToken = (url, method, body) => {
    return {
        url,
        method,
        body

    }
}
