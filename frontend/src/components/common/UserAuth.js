import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function UserAuth(props) {
    const { Component } = props
    let token = localStorage.getItem("access_token")
        if (!token) {
            return <Navigate to="/userlogin" />
        }

    return (
        <Component />
    )
}

export default UserAuth