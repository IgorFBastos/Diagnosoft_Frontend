
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCircleCheck, faCopy } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from "react-router-dom";




import "./Modal.css"


const ModalFormCreation = ({ onClose, link }) => {

    const navigate = useNavigate();


    return (
        <div className="modal-overlay modal-formCreation">
            <div className="Modal-container modal-formCreation">
                <div className="scroll-wrapper">
                    <FontAwesomeIcon
                        className="fa-icon-close"
                        icon={faXmark}
                        onClick={() => {
                            onClose(false);
                            navigate("/forms-area");
                        }} />

                    <div className="body">
                        <FontAwesomeIcon className="fa-icon-check" icon={faCircleCheck} />

                        <h2>Seu questionário foi criado com sucesso!</h2>


                        <a href={link} target="_blank" className="link" rel="noreferrer">{link}</a>
                        <div className="copy-link">
                            <p>Copiar link</p>
                            <FontAwesomeIcon icon={faCopy} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ModalFormCreation
