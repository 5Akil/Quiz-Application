import React, { useState } from 'react'
import { PuffLoader } from 'react-spinners';
import Admin_Edit_Quiz from '../admin-edit-quiz/Admin_Edit_Quiz';
import { useGetAllQuizQuery, useDeleteQuizMutation } from '../../../../services/quizApi'
import { toast } from 'react-toastify';
import Delete_Modal from '../../../common/Delete_Modal'



function Admin_view_Quiz() {

  const [quizId, setQuizId] = useState();
  console.log(quizId);
  const [modal, setModal] = useState(false);
  const [modalName, setModalname] = useState('');
  const { data, isLoading ,refetch } = useGetAllQuizQuery();
  
  
  const handleEdit = (id) => {
    setModal(true);
    setModalname('Edit_Modal')
    setQuizId(id);
  }
  
  const handleDelete = (id) => {
    setModal(true);
    setModalname("Delet_Modal")
    setQuizId(id);
  }

  const [deleteQuiz] = useDeleteQuizMutation();
  const delete_quiz=async()=>{
    const response = await deleteQuiz(quizId);
    if (response?.data.status === "success") {
        toast.success("Quiz Deleted ");
        setModal(false)
    }
}

  return (
    !isLoading ? (

      <div className="container" style={{ paddingTop: "100px" }}>

        <div className="card">
        <div style={{ backgroundImage: "linear-gradient(to right, rgb(115, 134, 213), rgb(179, 147, 211))", color: "white" }}>
            <h5 className="card-title text-center mt-3">Quizzes </h5>
          </div>
          {
            data?.quizList?.length === 0 ? (

              <div className='d-flex justify-content-center align-items-center' style={{ height: "200px", color: "grey" }} >

                <h3>
                   First Add Quiz!!!
                </h3>

              </div>
            ) :

              (
                <table className="table table-hover mb-0" >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Total Question</th>
                      <th>Total Marks</th>
                      <th>Update</th>
                      <th>Delete</th>
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
                            <td className=' align-middle'><button className="btn btn-primary p-1" onClick={() => handleEdit(item._id)} ><i  className="fas fa-pencil-alt"></i></button></td>
                            <td ><button className="btn btn-danger p-1" onClick={() => handleDelete(item._id)} style={{ border: "none" }}><i  className="fas fa-trash-alt"></i></button></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              )}
        </div>
        {
          modalName === "Edit_Modal" ?
            (

              <Admin_Edit_Quiz
                show={modal}
                onHide={() => setModal(false)}
                id={quizId}
                 refetch={refetch}

              />

            )
            : (
              <Delete_Modal
                show={modal}
                onHide={() => setModal(false)}
                message={'Are you sure, you want to delete this Quiz?'}
                method={() => delete_quiz()}
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

export default Admin_view_Quiz