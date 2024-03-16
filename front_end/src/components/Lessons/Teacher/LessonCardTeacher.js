import React ,{useState , useEffect} from "react";
import '../../../pages/style/LessonsCard.css'
import studytime from '../../../assets/study-time.png'
import { getAuthUser } from "../../../helper/Storage.js";
import axios from "axios";

const LessonCardTeacher = (props) => {

  const Auth = getAuthUser();

  const [lesson,setLessons] = useState({
    loading : true,
    results : [],
    err : null
  })


  const deleteLessson = (_id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/lessons/` + _id,{
      headers : {
        Authorization :`Bearer ${Auth.token}`
      }
    })
    .then((resp) =>{
      props.onDelete();
    })
    .catch((err)=>{
      setLessons({...lesson, err: err.data.data.msg })
    })
  }

  return (

    <div className="card-lesson">
      <div className="lessonCard py-2">  
        <div class="mainCardLesson mx-1 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
          <img src={studytime} height={50} alt=""/>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.name}</h5>
          <button type="button" class=" text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg text-base px-4 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Generate Quiz</button>
          <button type="button" class=" text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-large rounded-lg text-base px-4 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={(e)=>{deleteLessson(props._id)}}>Delete Lesson</button>
        </div>
    </div>
    </div>
  )
}

export default LessonCardTeacher;