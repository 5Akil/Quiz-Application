import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {getRTKQuery} from '../helper/RTKQuery'
import { adminQuery } from '../helper/adminQuery'


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    tagTypes: ['user-list'],
    endpoints: (builder) => ({
        userRegister:builder.mutation({
        query: (body)=> 
        ({
            url : "usersignup ",
            method: "POST",
            body: body
        })
            //  getRTKQuery("usersignup " , "POST" , body),
        }),
        userLogin : builder.mutation({
            query: (body)=> getRTKQuery("userlogin " , "POST" , body),
        }),
      
        sendEmail :  builder.mutation({
            query: (body)=> getRTKQuery("reset-password-email " , "POST" , body),
        }),
        resetPassword : builder.mutation({
            query:({ token , body})=>getRTKQuery(`change-password/${token}` , "POST" , body)
        }),
        getAllUser: builder.query({
            query: () => adminQuery("user-list" , "GET"  ),
            providesTags:['user-list']
        }),
        getUser: builder.query({
            query: () => 
            getRTKQuery('userdashboard' , 'GET' ),
            providesTags:["user-list"]
        }),
        getSIngleUser: builder.query({
            query: (id)=>getRTKQuery(`user-list/${id}` , 'GET')
        }),
        deleteUser: builder.mutation({
            query: (id) => getRTKQuery( `delete-user/${id}`, "DELETE") ,
            invalidatesTags:['user-list']
        }),
        editUser: builder.mutation({
            query: ({id ,...body}) => 
            getRTKQuery(`edit-user/${id}` , "PATCH" , body) ,
            invalidatesTags:['user-list']
        }),
    }),
   
})


export const {useUserRegisterMutation, useUserLoginMutation , useSendEmailMutation  , useResetPasswordMutation ,useGetUserQuery, useGetAllUserQuery,useGetSIngleUserQuery, useDeleteUserMutation ,useEditUserMutation } = userApi