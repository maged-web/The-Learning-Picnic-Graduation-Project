import React, { useState, useEffect } from "react";
import '../../style/Reports.css';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { getAuthUser } from '../../../helper/Storage';

const TeacherQuizReport = () => {
  let {id} = useParams();
  const Auth = getAuthUser();

  const [report, setReport] = useState({
    loading: true,
    results: [],
    err: null
  });

  const getReport = () => {
    setReport({ ...report, loading: true })
    axios.get(`${process.env.REACT_APP_API_URL}/report/` + id, {
      headers: {
        Authorization: `Bearer ${Auth.token}`
      }
    })
      .then(resp => {
        setReport({ ...report, results: resp.data.data.report, loading: false });
      })
      .catch(err => {
        setReport({ ...report, err: err.data.data.msg, loading: false })
      })
  }

  useEffect(() => {
    getReport();
  }, [])
  
  return (
    <div className="reports">
      <div className="header d-flex justify-content-between mb-6">
       <h3 className="reportsTitle text-5xl font-semibold text-white my-2 mx-auto">{report.results.lessonName}</h3>
      </div>

      <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th className="font-bold text-xl text-white">Questions</th>
        <th className="font-bold text-xl text-white">Score</th>
        <th className="font-bold text-xl text-white">Time Answered</th> 
      </tr>
    </thead>
    <tbody>
    {report.results && report.results.questions.map((question, index) => (
      <tr key={index}>
        <td className="text-base text-black">{question.questionText}</td>
        <td>{question.scorePercentage * 100}%</td>
        <td>{question.timesAnswered} times</td>
      </tr>
    ))}
         
   
    </tbody>
  </table>
</div>
    </div>

  )
}

export default TeacherQuizReport