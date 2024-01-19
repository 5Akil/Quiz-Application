import api from "../../axios/axioInstance"



export const getResult = async (userID ,attemptID ) => {
  const response = await api.get(`result/${attemptID}`)
  return response?.data?.result
}

export const getResultRecord = async(userID)=>{

  console.log(userID);
  const response =await api.get (`result-record/${userID}`)
  return response?.data?.record
}
