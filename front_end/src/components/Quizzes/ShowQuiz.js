import React from 'react'
import ShowStudentQuiz from './Student/ShowStudentQuiz'
import ShowTeacherQuiz from './Teacher/ShowTeacherQuiz'
import { getAuthUser } from '../../helper/Storage'

const ShowQuiz = () => {

    const Auth = getAuthUser();

    if(Auth && Auth.role === "TEACHER") {
        return (
            <ShowTeacherQuiz/>
        )
        
    }else {
        return (
            <ShowStudentQuiz/>
        )
    }
  
}

export default ShowQuiz