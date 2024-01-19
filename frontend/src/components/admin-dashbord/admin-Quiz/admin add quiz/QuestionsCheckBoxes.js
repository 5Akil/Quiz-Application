import React, { useEffect } from 'react'

function QuestionsCheckBoxes({ id, checked, question, index, handleQuestions, setSelectedQuestions, selectedQuestions, selectedQuestionsId, setSelectedQuestionsId }) {

    useEffect(() => {
        if (checked) {
            setSelectedQuestions([...selectedQuestions, question])
            setSelectedQuestionsId([...selectedQuestionsId, id])
        } else {
            const newQuestionArray = selectedQuestions.filter((item) => item !== question)
            const newQuestionIdArray = selectedQuestionsId.filter((item) => item!== id)
            setSelectedQuestions(newQuestionArray)
            setSelectedQuestionsId(newQuestionIdArray)
        }
    }, [checked])

    return (
        <label >
            <input
                className='me-3'
                type="checkbox"
                id={id}
                onChange={handleQuestions}  
                checked={checked}
            />{index} . {question}
        </label>
    )
}

export default QuestionsCheckBoxes