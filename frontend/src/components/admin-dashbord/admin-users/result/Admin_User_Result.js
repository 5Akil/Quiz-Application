import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { useGetResultsQuery } from '../../../../services/resultApi';
import styled from 'styled-components';

function  Admin_User_Result() {
    const { quizID, userID } = useParams();
    console.log(quizID ,userID);
    const navigate =useNavigate()

    const { data, isLoading, refetch } = useGetResultsQuery({ userID, quizID });   //get result from databse
    useEffect(() => {
        refetch(); // Trigger the data fetching when the component mounts
    }, [refetch]);

    const formatTimeDuration = (seconds, total) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        if (formattedTime >= total) {
            return total
        }
        return formattedTime;
    }
    const submissionDate = (dateString) => {
        // Parse the input date string into a Date object
        const date = new Date(dateString);

        // Convert to Indian Time Zone (IST)
        const dateInIST = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const formattedDate = dateInIST.toLocaleString('en-IN', options);
        return formattedDate;
    }
    const percentage = (item) => {
        if (item == 100 || item == 0) {
            return item
        } else {
            return item.toFixed(1)
        }
    }
    const handleClick = (attemptID) => {
        navigate(`/admindashboard/results/${userID}/${quizID}/${attemptID}`)
    }



    return (
        !isLoading ? (
            data?.record.length === 0 ? (
                <div className="container" style={{ paddingTop: "100px" }}>
                    <div className="card">
                        <div className='card-body test'>
                            <div className="test-sheet-summary-header">
                                <div className="name">There is not any record yet!!!!
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ) :
                <>
                    <Wrapper>
                        <div className="container" style={{ paddingTop: "100px" }}>
                            <div className="card">
                                <div className='card-body test'>
                                    <div className="title"><p>ALL COLLECTED RESULTS</p></div>
                                    <div className="test-sheet-summary-header">
                                        <div className="name">
                                        </div>
                                    </div>
                                    <div className='table-action-bar d-flex align-items-center ps-3' style={{ height: "54px" }}>
                                        <h5 className='m-0'>Records ({data?.record.length}) </h5>
                                    </div>
                                    <div className='table-action-bar d-flex align-items-center mt-3'>
                                        <table className="table table-hover m-0 " >
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Quiz Name</th>
                                                    <th scope="col">Total Score</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data?.record?.map((item, index) => {
                                                        index++
                                                        return (
                                                            <tr key={item._id} style={{ cursor: 'pointer' }} onClick={() => handleClick(item._id)}>
                                                                <th>{index}</th>
                                                                <td >{item.quizID.title}</td>
                                                                <td >
                                                                    <div className='text-center' >
                                                                        <div className='score_wrapper' style={{ width: "100px", backgroundColor: item.percentage >= 33 ? '#0BC279 ' : '#ff7067' }}>{percentage(item.percentage)}%</div>
                                                                    </div>
                                                                </td>
                                                                <td >{submissionDate(item.timeStamps)}</td>
                                                                <td >{formatTimeDuration(item.timeTaken, item.totalTime)}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Wrapper>

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

export default Admin_User_Result

const Wrapper = styled.div`
.title{
    font-family: Aktiv Grotesk , sans-serif;
    font-size: .75rem;
    line-height: 15px;
    font-weight: 600;
    letter-spacing: .05em;
    text-decoration: inherit;
    text-transform: uppercase;
    color: #0f2830;
    margin-top: 1px;
    margin-left: 4px;
}

.test{
    box-shadow: 3px 4px 10px rgba(201,216,225,.34);
    border-radius: 6px;
    padding: 20px;
}
h4{
    font-size: 40px;
    font-weight: 600;
    background-image: linear-gradient(to right, rgb(115, 134, 213), rgb(179, 147, 211));
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
}
.name{
    font-family: Aktiv Grotesk , sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-size: 1.375rem;
    line-height: 1.5rem;
    font-weight: 700;
    letter-spacing: normal;
    text-decoration: inherit;
    text-transform: inherit;
}

.table-action-bar{

    height: auto;
    display: flex;
    align-items: stretch;
    border: 1px solid #dfe6ed;
    justify-content: space-between;
    border-radius: 6px;
    box-sizing: border-box;
}
.score_wrapper{
    padding: 6px 10px 7px;
    font-weight: 400;
    white-space: nowrap;
    font-size: .875rem;
    background-color: #f78c8c;
    border-radius:5px;
}
`