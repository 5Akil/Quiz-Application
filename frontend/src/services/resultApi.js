import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getRTKQuery } from '../helper/RTKQuery';



export const resultApi = createApi({
    reducerPath: 'resultApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL }),
    tagTypes:['result'],
    endpoints: (builder) => ({
        getResults: builder.query({
            query: ({userID , quizID }) => getRTKQuery(`result/${userID}/${quizID}`),
            providesTags:['result']
        }),
        getSingleResult: builder.query({
            query:({attemptID})=>getRTKQuery(`/result/${attemptID}`)
        })
    })
})

export const { useGetResultsQuery , useGetSingleResultQuery } = resultApi