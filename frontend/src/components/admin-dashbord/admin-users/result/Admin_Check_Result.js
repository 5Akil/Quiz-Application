import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { useGetAllQuizQuery } from '../../../../services/quizApi';

function Admin_Check_Result() {
    const navigate =useNavigate();
    const { userID } = useParams();    
    const {data , isLoading }= useGetAllQuizQuery();

    const handleClick=(quizID )=>{
        console.log(quizID , " quiz quizID");
        navigate(`/admindashboard/results/${userID}/${quizID}`)
      }
  return (
   
    !isLoading ? (
        <>
            <div className="container" style={{ paddingTop: "100px" }}>
                <div className="card">
                <div style={{ backgroundImage: "linear-gradient(to right, rgb(115, 134, 213), #b393d3)", color: "white" }}>
                        <h5 className="card-title text-center mt-3 text-capitalize">Select Quiz To View Marks</h5>
                    </div>
                    <table className="table table-hover mb-0" >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Quiz Name</th>
                                <th>View Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.quizList?.map((item, index) => {
                                    { index++ }
                                    return (
                                        <tr >
                                            <th>{index}</th>
                                            <td >{item.title}</td>
                                            <td ><button className="btn btn-success p-1 ms-3" onClick={()=>handleClick(item._id)} style={{ border: "none" }}><i className="fas fa-eye"></i></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
  
        </>
    ) : (
        <div className="container" style={{ height: "100%", paddingTop: "100px", display: "flex", justifyContent: "center", alignItems: 'center' }}>
            <PuffLoader
                color="rgb(115, 134, 213)"
                size={142}
            />
        </div>
    )
  
  )  
  
}

export default Admin_Check_Result