import React, { useState } from 'react'
import Admin_Edit_User from '../edit-user/Admin_Edit_User'
import { PuffLoader } from 'react-spinners';
import { useDeleteUserMutation, useGetAllUserQuery } from '../../../../services/userApi';
import { toast } from 'react-toastify';
import Delete_Modal from '../../../common/Delete_Modal'


function Admin_All_Users() {
    const [userId, setUserId] = useState();
    const [modal, setModal] = useState(false);
    const [modalName, setModalname] = useState();
    const { data, isLoading } = useGetAllUserQuery();

    const handleEdit = (id) => {
        setModal(true);
        setUserId(id);
        setModalname("Edit_Modal")
    }
    const handleDelete = (id) => {
        setModal(true);
        setUserId(id);
        setModalname("Delete_Modal")
    }

    const [deleteuser] = useDeleteUserMutation();

    const delete_user = async () => {
        const response = await deleteuser(userId);
        if (response?.data.status === "success") {
            toast.success("User Removed Successfully");
            setModal(false)
        }
    }
    return (

        !isLoading ? (
            <div className="container" style={{ paddingTop: "100px" }}>


                <div className=" card">
                    <div style={{ backgroundImage: "linear-gradient(to right, rgb(115, 134, 213), rgb(179, 147, 211))", color: "white" }}>
                        <h5 className="card-title text-center mt-3 text-uppercase">Users List</h5>
                    </div>

                    {
                        data?.users?.length === 0 ? (

                            <div className='d-flex justify-content-center align-items-center' style={{ height: "200px", color: "grey" }} >

                                <h3>
                                    There is No , any User Right Now!!!
                                </h3>

                            </div>
                        ) :

                            (
                                <table className="table table-hover mb-0" id="dev-table">
                                    <thead>
                                        <tr>
                                            <th className=' align-middle'>#</th>
                                            <th className=' align-middle'>Name</th>
                                            <th className=' align-middle'>Profile Pic</th>
                                            <th className=' align-middle'>Email</th>
                                            <th className=' align-middle'>Designation</th>
                                            <th className=' align-middle'>Update</th>
                                            <th className=' align-middle'>Delete</th>
                                        </tr>
                                    </thead>


                                    <tbody>
                                        {data?.users?.map((item, index) => {
                                            index++;
                                            return <tr>
                                                <th className=' align-middle'>{index}</th>
                                                <td className=' align-middle'>{`${item.firstName}  ${item.lastName}`}</td>
                                                <td className=' align-middle'>
                                                    <div style={{ width: "50px", height: "50px", borderRadius: "50%", overflow: "hidden", verticalAlign: "center" }}>
                                                        <img  src={ item?.authBy === 'Google' ?  item?.image  :  `${process.env.REACT_APP_SERVER}/${item?.image}` } alt="Profile Pic" width="100%" height="100%" />
                                                    </div >
                                                </td>
                                                <td className=' align-middle'>{item.email}</td>
                                                <td className=' align-middle'>{item.designation}</td>
                                                <td className=' align-middle'><button className="btn btn-primary p-1" onClick={() => handleEdit(item._id)} ><i className="fas fa-pencil-alt"></i></button></td>
                                                <td className=' align-middle' ><button className="btn btn-danger p-1" onClick={() => handleDelete(item._id)} ><i className="fas fa-trash-alt"></i></button></td>
                                            </tr>
                                        })}

                                    </tbody>

                                </table>
                            )}
                </div>
                {
                    modalName === "Edit_Modal" ?
                        <Admin_Edit_User
                            show={modal}
                            onHide={() => setModal(false)}
                            id={userId}
                        />
                        : (
                            <Delete_Modal
                                show={modal}
                                onHide={() => setModal(false)}
                                method={() => delete_user()}
                                message={"Are you sure, You want to Remove This User?"}
                            />

                        )
                }

            </div >

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

export default Admin_All_Users