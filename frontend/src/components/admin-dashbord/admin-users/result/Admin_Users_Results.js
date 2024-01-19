import React from 'react'
import { PuffLoader } from 'react-spinners';
import { useGetAllUserQuery } from '../../../../services/userApi';
import { useNavigate } from 'react-router-dom';

function Admin_Users_Results() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllUserQuery()
  const handleClick = (id) => {
    navigate(`/admindashboard/results/${id}`)
  }

  return (

    !isLoading ? (
      <div className="container" style={{ paddingTop: "100px" }}>

        <div className=" card">

          <div style={{ backgroundImage: "linear-gradient(to right, rgb(115, 134, 213), rgb(179, 147, 211))", color: "white" }}>
            <h5 className="card-title text-center mt-3 text-uppercase">Users results</h5>
          </div>

          {
            data?.users?.length === 0 ? (

              <div className='d-flex justify-content-center align-items-center' style={{ height: "200px", color: "grey" }} >

                <h3>
                  There is not any Record Right Now
                </h3>

              </div>
            ) :

              (<table className="table table-hover mb-0" id="dev-table">
                <thead>
                  <tr>
                    <th className=' align-middle'>#</th>
                    <th className=' align-middle'>Name</th>
                    <th className=' align-middle'>Profile Picture</th>
                    <th className=' align-middle'>View Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.users?.map((item, index) => {
                    index++;
                    return <tr>
                      <th className=' align-middle'>{index}</th>
                      <td className=' align-middle'> {`${item.firstName}  ${item.lastName}`} </td>
                      <td className=' align-middle'>
                        <div style={{ width: "50px", height: "50px", borderRadius: "50%", overflow: "hidden", verticalAlign: "center" }}>
                          <img src={ item?.authBy === 'Google' ?  item?.image  :  `${process.env.REACT_APP_SERVER}/${item?.image}` }  alt="Profile Pic" width="100%" height="100%" />
                        </div >
                      </td>
                      <td className=' align-middle' ><button className="btn btn-success p-1 ms-3" onClick={() => handleClick(item._id)} ><i className="fas fa-eye"></i></button></td>
                    </tr>
                  })}
                </tbody>
              </table>)
          }
        </div>
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

export default Admin_Users_Results