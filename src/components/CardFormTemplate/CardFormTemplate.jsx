import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import "./CardFormTemplate.css"
import api from "@service/apiService"




const CardFormTemplate = ({ form, onUpdateForms, onDeleteTemplate }) => {

    const navigate = useNavigate();

    const [idTemplate, setIdTemplate] = useState(form._id)

    const handleSendForm = () => {

        navigate(`/form-creation-generic/${idTemplate}`);
    }


    const handleDeletTemplate = async () => {
        
        try {

            const response = await api.delete(`/api/forms/form-template/delete/${idTemplate}`)

            console.log("Template deletado com sucesso. ", response);

            console.log("forms: ", form)

            onDeleteTemplate(idTemplate);


        } catch (error) {
            console.error("Erro ao deletar Template. ", error)
        }
    }


    return (
        <div className="card-form">
            <div className="data">
                <h2 className="patient-name">Template: {form.template_name}</h2>
                <p className="form-name">Médico: {form.medic_name}</p>
                <p className="createdAt">
                    {new Date(form.createdAt)
                        .toLocaleDateString("pt-BR", { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })
                        .replace(/^./, str => str.toUpperCase())
                    } às {
                        new Date(form.createdAt).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })
                    }
                </p>
            </div>
            <div className="optionsBTNS">
                <button className="TemplateSendBtn" onClick={handleSendForm}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
                <button className="DeleteBtn" onClick={handleDeletTemplate}>
                    <FontAwesomeIcon icon={faTrash} className="icon-trash" />
                </button>
            </div>
        </div>
    )
}

export default CardFormTemplate
