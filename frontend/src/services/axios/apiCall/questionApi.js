import api from "../../axios/axioInstance"



export const getAllQuestions = async () => {
  const questions = await api.get('total-questions')
  return questions?.data?.totalQuestions
}

export const getQuestions = async (id)=>{
  const questions = await api.get(`get-questions/${id}`)
  return questions?.data?.questions
}

export const postAnswers =async ({quizID ,  ...body })=>{
  const submit=await api.post(`submit/${quizID}` ,body)
  return submit
}