
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCircleCheck, faCopy } from '@fortawesome/free-solid-svg-icons'



import "./Modal.css"


const ModalQuestionCreation = ({ onClose, link }) => {



    return (
        <div className="modal-overlay">

            <div className="Modal-container">
                <FontAwesomeIcon icon={faXmark} onClick={() => onClose(false)} />

                <div>
                    <FontAwesomeIcon icon={faCircleCheck} />

                    <h2>Seu questionário foi criado com sucesso!</h2>

                    <a href={link} target="_blank" rel="noreferrer">{link}</a>

                    <div>
                        <p>Copiar link</p>
                        <FontAwesomeIcon icon={faCopy} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ModalQuestionCreation
