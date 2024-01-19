import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getNewAccesssToken } from '../helper/RTKQuery';



export const newAccessTokenApi = createApi({
    reducerPath: 'newAccessTokenApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    endpoints: (builder) => ({
        getNewAccessToken: builder.mutation({
            query: (body) => getNewAccesssToken('new-access-token', "POST", body),
        }),

    }),
   
   
})

export const { useGetNewAccessTokenMutation } = newAccessTokenApi