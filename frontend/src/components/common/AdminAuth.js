import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminAuth(props) {
    const { Component} = props
    const navigate = useNavigate()
    useEffect(() => {
        let token = localStorage.getItem("admin_access_token")
        if (!token) {
            navigate('/adminlogin')
        }
    })
    return (
        <Component />
    )
}

export default AdminAuth