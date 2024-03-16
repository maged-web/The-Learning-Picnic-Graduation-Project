import { createBrowserRouter} from "react-router-dom";
import Home from '../pages/Home/Home'
import Login from '../pages/Auth/Login'
import App from "../App";
import Error from "../pages/Error/Error";
import Contact from "../pages/contact/Contact";
import ShowLessons from "../components/Lessons/ShowLessons";
import Summarization from "../pages/Summarization/Summarization";
import Register from "../pages/Auth/Register";
import LessonAddition from "../components/Lessons/Teacher/LessonAddition";
import Account from "../pages/Account/Account";
import ShowQuiz from "../components/Quizzes/ShowQuiz";
import ShowReports from "../pages/Reports/ShowReports";
import Questions from "../pages/Questions/Questions";
import TeacherQuizReport from "../pages/Reports/Teacher/TeacherQuizReport";
import TeacherDashboard from "../pages/Admin/TeacherDashboard";
import ParentDashboard from "../pages/Admin/ParentDashboard";
import StudentDashboard from "../pages/Admin/StudentDashboard";
import AddChild from "../pages/Admin/DashboardFunctions/AddChild";
import UpdateDashboard from "../pages/Admin/DashboardFunctions/UpdateDashboard";
import Guest from "../middleware/Guest";
import Admin from "../middleware/Admin";
import User from "../middleware/User";


export const routes = createBrowserRouter([
 {
    path: "",
    element: <App />,
    errorElement: <Error />,
    children: [
        {
        path: "/",
        element: <Home/>,
        },
        
        // Guest Middleware
        {
            element: <Guest />,
            children: [
                    {
                    path: "/login",
                    element: <Login/>,
                    },
                    
            ]
    
        },

        // Admin Middleware
        {
            element: <Admin />,
            children: [
                {
                    path: "/registration",
                    element: <Register/>
                },
                 {
            path: "/teacher",
            element: <TeacherDashboard/>
        },
        {
            path: "/parent",
            element: <ParentDashboard/>
        },
        {
            path: "/student",
            element: <StudentDashboard/>
        },
        {
            path: "/addChild",
            element: <AddChild/>
        },
        {
            path: "/update",
            element: <UpdateDashboard/>
        }
            ]
            
        },

        //User Middleware
        {
            element: <User />,
            children: [
             {
                    path: "/login",
                    element: <Login/>,
                    },
                {
        path: "/contact",
        element: <Contact/>,
        },
        {
            path: '/Lessons',
            children : [
                {
                    path : "",
                    element : <ShowLessons/>
                },
                {
                    path : ':id',
                    element : <Summarization/>
                }
            ]
        },
        {
            path: '/addition',
            element: <LessonAddition/>
        },
        {
            path: "/account",
            element: <Account/>
        },
        {
            path: "/quizzes",
            element: <ShowQuiz/>
        },
        {
            path: "/reports",
            children :[
                {
                    path:"",
                    element :<ShowReports/>
                },
                {
                    path: ":id",
                    element : <TeacherQuizReport/>
                }
            ]
        },
        {
            path: ":id",
            element: <Questions/>,
        },
            ]
        },
        
       
    ]
  }
]);