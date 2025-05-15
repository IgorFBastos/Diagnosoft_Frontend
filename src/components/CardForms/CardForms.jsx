

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClock, faEye, faPen } from '@fortawesome/free-solid-svg-icons'


import "./CardForms.css"

const CardForms = ({ form }) => {


    return (
        <div className="card-form">
            <div className="data">
                <h2 className="patient-name">{form.patient_name}</h2>
                <p className="form-name">{form.form_name}</p>
                <p className="createdAt">
                    {new Date(form.createdAt)
                        .toLocaleDateString("pt-BR", { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })
                        .replace(/^./, str => str.toUpperCase())
                    } às {
                        new Date(form.createdAt).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })
                    }
                </p>
                <p className="status">
                    {form.status === "answered" ? (
                        <>
                            Questionário Respondido <FontAwesomeIcon icon={faCheck} className="fa-icon" />
                        </>
                    ) : (
                        <>
                            Questionário Aguardando Resposta <FontAwesomeIcon icon={faClock} className="fa-icon" />
                        </>
                    )}
                </p>
                <p className="link">http://testelink/apsadsd5165</p>
            </div>
            <div className="options">
                <p >
                    {form.status === "answered" ?  
                        (
                            <div>
                                Visualizar Respostas <FontAwesomeIcon icon={faEye} className="fa-icon"/>
                            </div>
                        )
                    : 
                        (
                            <div>
                                Editar Questionário <FontAwesomeIcon icon={faPen} className="fa-icon"/>
                            </div>
                        )}
                </p>
            </div>
        </div>
    )
}

export default CardForms
