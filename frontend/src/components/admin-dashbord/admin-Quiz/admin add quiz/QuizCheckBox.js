import React, { useEffect, useState } from 'react'
import { useGetQuizQuery } from '../../../../services/quizApi';

function QuizCheckBox({ id, name, handleChange, chooseQuestion, setChooseQuestion, checked }) {
    
    const { data, isSuccess } = useGetQuizQuery(id, { skip: !checked });

    console.log(data);


    useEffect(() => {
        const questions = data?.quiz?.questions
        // if (id === 'all') {
        //     if (checked) {
        //         setChooseQuestion(questions)
        //     } else {
        //         setChooseQuestion([])
        //     }
        // } else {
            if (checked) {
                setChooseQuestion((prevQuestions) => {
                    const newQuestions = questions.filter((question) => !prevQuestions.includes(question));  // remove common questions
                    console.log(newQuestions);
                    return [...prevQuestions, ...newQuestions];
                });
            } else {
                const newField = chooseQuestion.filter(item => item.catagory_id !== id);
                setChooseQuestion(newField) 
            }
        // }

    }, [isSuccess])


    return (
        <label >
            <input
                className='me-3'
                type="checkbox"
                id={id}
                name={name}
                onChange={handleChange}
                checked={checked}
            />{name}
        </label>
    )
}

export default QuizCheckBox
