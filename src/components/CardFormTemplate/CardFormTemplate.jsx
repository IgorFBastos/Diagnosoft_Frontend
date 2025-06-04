import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClock, faEye} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import navigate from "navigate";



const CardFormTemplate = ({form}) => {

    // const navigate = useNavigate();

    const [idTemplate, setIdTemplate] = useState(form._id)


    useEffect(() => {
        console.log("id: ", idTemplate)
    })

    console.log("form: ", form);

    // const handleOpenFormResult = () => {
    //     const id = form._id;
    //     navigate(`/form-result/${id}`)
    // }

    const handleSendForm = () => {

        navigate(`/form-creation-generic/${idTemplate}`);
    }

    return (
        <div className="card-form">
            <div className="data">
                <h2 className="patient-name">Questionário: {form.template_name}</h2>
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
            <div className="options">
                <button onClick={handleSendForm}>Enviar para paciente</button>
            </div>
        </div>
    )
}

export default CardFormTemplate
