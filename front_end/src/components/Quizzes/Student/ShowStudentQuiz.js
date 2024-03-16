import React ,{useState , useEffect} from "react";
import StudentQuizCard from './StudentQuizCard'
import '../../../pages/style/ShowQuizTeacher.css'
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import { getAuthUser } from "../../../helper/Storage.js";

const ShowStudentQuiz = () => {

  const Auth = getAuthUser();

  const [quizzes,setQuizzes] = useState({
    loading : true,
    results : [],
    err : null
  })

  const loadQuizzes = () => {
    setQuizzes({ ...quizzes, loading: true });
    axios.get(`${process.env.REACT_APP_API_URL}/quizes/`, {
      headers: {
        Authorization: `Bearer ${Auth.token}`
      }
    })
      .then(resp => {
        setQuizzes({ ...quizzes, results: resp.data.data.quiz, loading: false });
      })
      .catch(err => {
        setQuizzes({ ...quizzes, loading: false, err: err.data.data.msg });
      });
  };

   useEffect ( ()=>{
    loadQuizzes();
  }, [])
  

  return (

   <div className='bodyTeacherQuiz'>
     {quizzes.loading === true && (
          <div className="flex items-center justify-center h-screen">
          <Spinner className="h-12 w-12" />
        </div>
       )}

      <div className="content-container p-3">
        <div className='row-auto'>
            <div class="gridContainer grid grid-cols-6 gap-4">
            {quizzes.results && quizzes.results.map((quiz,index) => (
              <StudentQuizCard key={quiz.index} lessonName={quiz.lessonName} />
            ))} 
            </div>
        </div>
     </div>
    </div>
  )
}

export default ShowStudentQuiz