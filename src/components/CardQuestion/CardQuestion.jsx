

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import "./CardQuestion.css"


const CardQuestion = ({ question, type, number, onEdit }) => {
    return (
        <div className="cardQuestion-container">

            <div className="questionAndType-container">
                <div className="question-container">
                    <span>{number}.</span>
                    <span> {question}</span>
                </div>

                <div className="typeQuestion-container">
                    <p>{type}</p>
                </div>
            </div>

            <div className="edit-question" onClick={onEdit}>
                <FontAwesomeIcon icon={faPen} />
            </div>
        </div>
    )
}

export default CardQuestion
