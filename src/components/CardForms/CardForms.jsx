
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClock, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import api from "@service/apiService"


import "./CardForms.css"

const CardForms = ({ form, onDeleteForm }) => {

    const navigate = useNavigate();

    console.log("form: ", form);

    const id = form._id;

    const handleOpenFormResult = () => {
        
        navigate(`/form-result/${id}`)
    }

    const handleDeleteForm = async () => {

        try {

            const response = await api.delete(`/api/forms/delete/${id}`)

            console.log("Form deletado com sucesso. ", response);

            console.log("forms: ", form)

            onDeleteForm(id);


        } catch (error) {
            console.error("Erro ao deletar Template. ", error)
        }
    }

    return (
        <div className="card-form">
            <div className="data">
                <h2 className="patient-name">Paciente: {form.patient_name}</h2>
                <p className="form-name">{form.form_name}</p>
                <p className="createdAt">
                    {new Date(form.createdAt)
                        .toLocaleDateString("pt-BR", { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })
                        .replace(/^./, str => str.toUpperCase())
                    } às {
                        new Date(form.createdAt).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })
                    }
                </p>
                <p className="link">{form.link}</p>
                <p className="status">
                    {form.status === "answered" ? (
                        <>
                            Questionário Respondido <FontAwesomeIcon icon={faCheck} className="fa-icon" />
                        </>
                    ) :
                        (
                            <>
                                Questionário Aguardando Resposta <FontAwesomeIcon icon={faClock} className="fa-icon" />
                            </>
                        )}
                </p>
            </div>
            <div className="options">
                <p >
                    {form.status === "answered" ?
                        (
                            <div onClick={handleOpenFormResult}>
                                Visualizar Respostas <FontAwesomeIcon icon={faEye} className="fa-icon" />
                            </div>
                        )
                        : ""
                        // (
                        //     <div>
                        //         Editar Questionário <FontAwesomeIcon icon={faPen} className="fa-icon" />
                        //     </div>
                        // )
                    }
                </p>

                <p>
                    <FontAwesomeIcon onClick={handleDeleteForm} icon={faTrash} className="fa-icon icon-trash" />
                </p>
            </div>
        </div>
    )
}

export default CardForms
