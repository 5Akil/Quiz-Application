import api from "../../axios/axioInstance"



export const getAllQuiz = async () => {
  const quiz = await api.get('quiz-list')
  return quiz?.data?.quizList
}
export const getSingleQuiz =async(id)=>{
  const quiz = await api.get(`quiz-list/${id}`)
  return quiz
}