import React ,{useState , useEffect} from "react";
import LessonCardTeacher from "./LessonCardTeacher";
import '../../../pages/style/ShowLessonCardStudent.css'
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import { getAuthUser } from "../../../helper/Storage.js";

const ShowLessonsTeacher = () => {
  const Auth = getAuthUser();

  const [lessons,setLessons] = useState({
    loading : true,
    results : [],
    err : null
  })

  const loadLessons = () => {
    setLessons({ ...lessons, loading: true });
    axios.get(`${process.env.REACT_APP_API_URL}/lessons/`, {
      headers: {
        Authorization: `Bearer ${Auth.token}`
      }
    })
      .then(resp => {
        setLessons({ ...lessons, results: resp.data.data.lesson, loading: false });
      })
      .catch(err => {
        setLessons({ ...lessons, loading: false, err: err.data.data.msg });
      });
  };

   useEffect ( ()=>{
    loadLessons();
  }, [])

  const handleLessonDelete = () => {
    loadLessons();
  };

  return (
    <div className="homeContainer">  

<form class="flex items-center max-w-sm mx-auto my-2">   
        <div class="relative w-full">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for lesson..." required />
    </div>
    <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search</span>
    </button>
</form>

    {lessons.loading === true && (
          <div className="flex items-center justify-center h-screen">
          <Spinner className="h-12 w-12" />
        </div>
    )}
      <div className="content-container p-3"> 
      <div className="row-auto">
        <div class="gridContainer grid grid-cols-6 gap-4">
        {lessons.results.map(lesson => (
              <LessonCardTeacher key={lesson._id} name={lesson.name} _id={lesson._id} pdfFile={lesson.pdfFile} onDelete={handleLessonDelete}/>
            ))}
        </div>
        <a href="/addition">
          <button type="button" class="mt-2 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-large rounded-full text-base px-4 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Lesson</button>
        </a>  
      </div>
      </div>
    </div>
    
  )
}

export default ShowLessonsTeacher;