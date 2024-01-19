import React, { useEffect} from 'react'
import {  useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { useGetAllQuizQuery } from '../../../../services/quizApi';

function Admin_view_Questions() {

    const navigate = useNavigate();

    const { data, isLoading, refetch } = useGetAllQuizQuery();

    const openQuestions = async (id) => {
        navigate("/admindashboard/admin-questions/view-questions/" + `${id}`)
    }

    useEffect(() => {
        refetch(); // Trigger the data fetching when the component mounts
    }, [refetch]);


    return (
        !isLoading ? (
            <>
                <div className="container" style={{ paddingTop: "100px" }}>
                    <div className="card">
                    <div style={{ backgroundImage: "linear-gradient(to right, rgb(115, 134, 213), rgb(179, 147, 211))", color: "white" }} >
                            <h5 className="card-title text-center mt-3">Select Quiz To View Questions</h5>
                        </div>

                        {
                           data?.quizList?.length === 0 ? (

                                <div className='d-flex justify-content-center align-items-center' style={{ height: "200px", color: "grey" }} >

                                    <h3>
                                        There is not any Questions Right Now
                                    </h3>

                                </div>
                            ) : (
                                <table className="table table-hover mb-0" >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Course Name</th>
                                            <th>Total Question</th>
                                            <th>Total Marks</th>
                                            <th>View Question</th>
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
                                                        <td >{item.questions.length}</td>
                                                        <td >{item.questions.reduce(function (sum, item) {
                                                            return sum + item.marks
                                                        }, 0)}</td>
                                                        <td ><button className="btn btn-success p-1" onClick={() => openQuestions(item._id)} style={{ border: "none" }}><i className="fas fa-eye"></i></button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            )}
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

export default Admin_view_Questions




// {item.questions.reduce(function (sum, item) {
//     return sum + item.marks} , 0)}