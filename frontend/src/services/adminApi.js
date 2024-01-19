
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getRTKQuery } from '../helper/RTKQuery';


export const adminApi =createApi({
    reducerPath:"adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL  }),
    tagTypes: ['admin-info'],
    endpoints: (builder) => ({
        adminLogin:builder.mutation({
            query: (body) => 
            getRTKQuery('adminLogin' , "POST" , body)
        }),
        getAdmin: builder.query({
            query: () => 
            getRTKQuery('admindashboard' , 'GET' ),
            providesTags:['admin-info']
        }),
       
    })
    })

    export const{useGetAdminQuery ,useAdminLoginMutation ,useGetUserResultQuery} = adminApi