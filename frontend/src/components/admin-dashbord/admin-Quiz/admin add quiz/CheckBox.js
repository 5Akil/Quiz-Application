import React, { useEffect, useState } from 'react'
import { useGetQuestionsQuery } from '../../../../services/quizApi';

function CheckBox({ id, name, handleChange, chooseQuestion, setChooseQuestion, checked }) {
    

    const { data, isSuccess } = useGetQuestionsQuery(id, { skip: !checked });


    useEffect(() => {
        const questions = data?.questions;
        if (id === 'all') {
            if (checked) {
                setChooseQuestion(questions)
            } else {
                setChooseQuestion([])
            }
        } else {
            if (checked) {
                setChooseQuestion((prevQuestions) => {
                    const newQuestions = questions.filter((question) => !prevQuestions.includes(question));  // remove common questions
                    return [...prevQuestions, ...newQuestions];
                });
            } else {
                const newField = chooseQuestion.filter(item => item.catagory_id !== id);
                setChooseQuestion(newField)
            }
        }

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

export default CheckBox
