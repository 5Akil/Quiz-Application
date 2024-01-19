import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getRTKQuery } from '../helper/RTKQuery';

export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL  }),
    tagTypes: ['quiz-list' , 'questions'],
    endpoints: (builder) => ({
        getAllQuiz: builder.query({
            query: () => getRTKQuery('quiz-list', 'GET'),
            providesTags: ['quiz-list' ,{type: 'questions'}]
        }),
        getQuiz: builder.query({
            query: (id) => getRTKQuery(`quiz-list/${id}`, 'GET'),
            providesTags: ['quiz-list' ,'questions' ]

        }),
        addQuiz: builder.mutation({
            query: (body) => getRTKQuery(`add-quiz`, 'POST', body),
            invalidatesTags: ['quiz-list']

        }),
        editQuiz: builder.mutation({
            query: ({ id, ...body }) => getRTKQuery(`edit-quiz/${id}`, 'PATCH', body),
            invalidatesTags: ['quiz-list']

        }),

        deleteQuiz: builder.mutation({
            query: (quizId) => getRTKQuery(`delete-quiz/${quizId}`, "DELETE"),
            invalidatesTags: ['quiz-list']
        }),




        getTotalQuestions: builder.query({
            query: () => getRTKQuery('total-questions' , 'GET'),
            providesTags:[ 'questions']
        }),
        getQuestions:builder.query({
            query: (id)=> getRTKQuery(`get-questions/${id}` , 'GET'),
            providesTags:['questions'],
        }),
        getSingleQuestion: builder.query({
            query:(id)=> getRTKQuery(`single-question/${id}` , 'GET'),
            providesTags:['questions']
        }),
        addQuestion: builder.mutation({
            query: (body)=> getRTKQuery("add-questions" , 'POST' ,body),
            invalidatesTags:['quiz-list']
        }),
        editQuestion: builder.mutation({
            query: ({id,...body})=> getRTKQuery( `edit-question/${id}`, 'PATCH' ,body),
            invalidatesTags:['quiz-list']
        }),
        deleteQuestion : builder.mutation({
            query: ({ questionId , ...body })=>  getRTKQuery( `delete-question/${questionId}`, 'DELETE' , body ),
            invalidatesTags:['questions' , 'quiz-list' ]
        }),
        submitAnswers : builder.mutation({
            query: ({quizID,...body})=>  getRTKQuery( `submit/${quizID}`, 'POST' ,body),
        })
    })

})



export const { useGetAllQuizQuery, useGetQuizQuery, useAddQuizMutation, useEditQuizMutation, useDeleteQuizMutation ,useGetTotalQuestionsQuery ,useGetQuestionsQuery,useGetSingleQuestionQuery , useEditQuestionMutation,useDeleteQuestionMutation , useAddQuestionMutation ,useSubmitAnswersMutation } = quizApi