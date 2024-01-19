import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { PuffLoader } from 'react-spinners';
import Admin_Edit_Question from '../admin-edit-question/Admin_Edit_Question';
import Delete_Modal from '../../../common/Delete_Modal.js'
import { useDeleteQuestionMutation } from '../../../../services/quizApi';
import { toast } from 'react-toastify';
import { useGetQuizQuery } from '../../../../services/quizApi';


function List() {
    const { id } = useParams();

    const [modal, setModal] = useState(false);
    const [modalName, setModalname] = useState('');
    const [questionId, setQuestionId] = useState('')
    const { data, isLoading ,refetch } = useGetQuizQuery(id);

    const handlEdit = (id) => {
        setModal(true);
        setModalname("Edit_Modal")
        setQuestionId(id);
    }
    const handleDelete = (id) => {
        setModal(true);
        setModalname("Delet_Modal")
        setQuestionId(id);
    }

    const [deleteQuestion] = useDeleteQuestionMutation();

    const delete_question=async()=>{
        const IDs ={questionId , id}
        const response = await deleteQuestion(IDs);

        if (response.data.status === "success") {
            toast.success("Question Deleted Successfully");
            setModal(false)

        }
    }
    useEffect(()=>{
        refetch()
    },[refetch])
    return (
        !isLoading ? (
            <div className="container" style={{ paddingTop: "100px" }}>

                <div className="card ">
                    <div style={{ backgroundImage: "linear-gradient(to right, rgb(115, 134, 213), rgb(179, 147, 211))", color: "white" }}>
                        <h5 className="card-title text-center mt-3">Questions</h5>
                    </div>
                    {
                       data?.quiz?.questions?.length === 0 ? (
                            <div className='d-flex justify-content-center align-items-center' style={{ height: "200px", color: "grey" }} >
                                <h3>  There is No any Question Available in this Quiz Right Now!!!</h3>
                            </div>
                        ) :
                            (<table className="table table-hover mb-0" id="dev-table">
                                <thead>
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col' >Question</th>
                                        <th scope='col'>Marks</th>
                                        <th scope='col'>Edit Question</th>
                                        <th scope='col'> Delete Question</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {data?.quiz?.questions?.map((item, index) => {
                                        //map through quiz questions
                                        { index++ }

                                        return <tr scope='row' key={item._id}>
                                            <th>{index}</th>
                                            <td >{item.question}</td>
                                            <td> {item.marks}</td>
                                            <td width={"200px"} ><button className="btn btn-primary p-1 ms-5" onClick={() => handlEdit(item._id)} style={{ border: "none" }}><i className="fas fa-pencil-alt"></i></button></td>
                                            <td width={"200px"} ><button className="btn btn-danger p-1 ms-5" onClick={() => handleDelete(item._id)} style={{ border: "none" }} ><i className="fas fa-trash-alt"></i></button></td>
                                        </tr>
                                    }
                                    )}
                                </tbody>
                            </table>
                        )}
                </div>

                {
                    modalName === "Edit_Modal" ?
                        (

                            <Admin_Edit_Question
                                show={modal}
                                onHide={() => setModal(false)}
                                id={questionId}
                                refetch={refetch}

                            />

                        )
                        : (

                            <Delete_Modal
                                show={modal}
                                onHide={() => setModal(false)}
                                questionId={questionId}
                                quizId={id}
                                method= {()=>delete_question()}
                                message={"Are you sure, you want to delete this Question?"}
                            />

                        )
                }


            </div>
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

export default List

