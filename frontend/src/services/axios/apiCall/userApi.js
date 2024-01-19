import api from "../../axios/axioInstance"


export const getUser= async () => {
  const user = await api.get('userdashboard')
  return user
}