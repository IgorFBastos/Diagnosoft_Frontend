

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

import "./CardQuestion.css"


const CardQuestion = ({ question, type, number, onEdit, onDelete }) => {
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

            <div className="icons-container">

                <div className="fa-icon" onClick={onEdit}>
                    <FontAwesomeIcon icon={faPen} />
                </div>

                <div className="fa-icon icon-trash" onClick={onDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </div>

            </div>

        </div>
    )
}

export default CardQuestion
