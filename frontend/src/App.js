
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Home from './components/Home';
import Register from './components/register/Register';
import User_Login from './components/login/user-login/User_Login';
import Required from './components/login/user-login/Required'
import Admin_Login from './components/login/admin-login/Admin_Login';
import About_Us from './components/common/About_Us.js'
// import User from './components/login/User.js';
import Forgot from './components/login/forgot password/Forgot';
import ResetPassword from './components/login/forgot password/ResetPassword';
import AdminAuth from './components/common/AdminAuth'

//import admin dashboard components
import Admin_Dashboard_Home from './components/admin-dashbord/main';
import Admin_Dashboard from './components/admin-dashbord/Admin_Dashboard';
import Admin_User from './components/admin-dashbord/admin-users/Admin_User';
import Admin_All_Users from './components/admin-dashbord/admin-users/user-list/Admin_All_Users';
import Admin_Users_results from './components/admin-dashbord/admin-users/result/Admin_Users_Results';
import Admin_Check_Result from './components/admin-dashbord/admin-users/result/Admin_Check_Result';
import Admin_User_Result from './components/admin-dashbord/admin-users/result/Admin_User_Result';
import Final_Result from './components/admin-dashbord/admin-users/result/Final_Result';
import Admin_Quiz from './components/admin-dashbord/admin-Quiz/quiz-list/Admin_Quiz';
import Admin_Add_Quiz from './components/admin-dashbord/admin-Quiz/admin add quiz/Admin_Add_Quiz';
import Admin_Questions from './components/admin-dashbord/admin-questions/Admin_Questions';
import Admin_Add_Questions from './components/admin-dashbord/admin-questions/admin-add-questions/Admin_Add_Questions';
import Admin_Open_Questions from './components/admin-dashbord/admin-questions/question-list/Admin_Open_Question';

//import user dashboard components
import User_Dashboard_Home from './components/user-dashboard/main';
import User_Dashboard from './components/user-dashboard/User_Dashboard'
import Quiz_List from './components/user-dashboard/user-quiz/Quiz_List'
import Start_Quiz from './components/user-dashboard/user-quiz/Start_Quiz'
import User_Marks from './components/user-dashboard/user-marks/User_Marks'
import User_Result from './components/user-dashboard/user-marks/User_Result'


//Error Page
import Error_Page from './components/error_page/Error_page'
import Admin_view_Quiz from "./components/admin-dashbord/admin-Quiz/quiz-list/Admin_view_Quiz";
import Admin_view_Questions from "./components/admin-dashbord/admin-questions/question-list/Admin_view_Questions";
import UserAuth from "./components/common/UserAuth";
import { AuthProvider } from "./contaxt/authContaxt";
function App() {


  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/user" element={<User />} /> */}
          <Route path="/user/usersignup" element={<Register />} />
          <Route path="/user/reset-password-email" element={<Forgot />} />
          <Route path="/user/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/adminlogin" element={<Admin_Login />} />
          <Route path="/userlogin" element={<User_Login />} />
          <Route path="/required" element={<Required />} />
          <Route path="/about-us" element={<About_Us />} />

          {/*-----------Admin Dashboard-------------- */}

          <Route path="/admindashboard" element={<AdminAuth Component={Admin_Dashboard_Home} />} >
            <Route index element={<Admin_Dashboard />} />
            <Route path="users"  >
              <Route index element={<Admin_User />} />
              <Route path="list" element={<Admin_All_Users />} />
            </Route>
            <Route path="results" >
              <Route index element={<Admin_Users_results />} />
              <Route path=":userID" element={<Admin_Check_Result />} />
              <Route path=":userID/:quizID" element={<Admin_User_Result />} />
              <Route path=":userID/:quizID/:attemptID" element={< Final_Result />} />
            </Route>
            <Route path="admin-quiz" >
              <Route index element={<Admin_Quiz />} />
              <Route path="admin-add-quiz" element={<Admin_Add_Quiz />} />
              <Route path="admin-view-quiz" element={<Admin_view_Quiz />} />
            </Route>
            <Route path="admin-questions"  >
              <Route index element={<Admin_Questions />} />
              <Route path="add-questions" element={<Admin_Add_Questions />} />
              <Route path="view-questions" >
                <Route index element={<Admin_view_Questions />} />
                <Route path=":id" element={<Admin_Open_Questions />} />
              </Route>
            </Route>
          </Route>

          {/*-----------User Dashboard-------------- */}
          <Route path="/userdashboard" element={<UserAuth Component={User_Dashboard_Home} />}>
            <Route index element={<User_Dashboard />} />
            <Route path="quiz-list"  >
              <Route index element={<Quiz_List />} />
              <Route path=":id" element={<Start_Quiz />} />
            </Route>
            <Route path="result"  >
              <Route index element={<User_Marks />} />
              <Route path=":attemptId" element={<User_Result />} />
            </Route>
          </Route>

          {/*--------------Error Page-------------- */}

          <Route path="*" element={<Error_Page />} />
        </Routes>
        <ToastContainer position='bottom-right'></ToastContainer>
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
}

export default App;
