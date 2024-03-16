import React from 'react'
import quiztime from '../../../assets/quiz-time.png'
import { Link } from 'react-router-dom';
import '../../../pages/style/QuizCard.css'

const StudentQuizCard = (props) => {
  return (
    <div className='card-quiz'>  
      <div class="quizCard py-2">
              <div class="mainCardQuiz mx-1 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-700">
                  <img src={quiztime} height={50} alt="" />  
                  <h3 class="mb-1 text-2xl font-bold tracking-tight text-cyan-800 dark:text-cyan-800">{props.lessonName} Quiz</h3>
                  <Link to={"/5"}>
                      <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Show Quiz</button>
                  </Link>
                  <Link to={"/S"}>
                      <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base px-4 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Model Answer</button>
                  </Link>
              </div>
        </div>
    </div>
  )
}

export default StudentQuizCard