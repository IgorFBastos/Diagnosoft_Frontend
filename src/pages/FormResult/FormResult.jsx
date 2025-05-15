
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import api from "@service/apiService"

import "./FormResult.css"



const FormResult = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [formName, setFormName] = useState("");
    const [medicName, setMedicName] = useState("")
    const [patientName, setPatientName] = useState("")


    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await api.get(`/api/forms/list/${id}`);

                setFormData(response);

            } catch (error) {
                console.error("Erro ao Pegar formulário:", error);
            }
        }
        fetchForm();
    }, [])

    useEffect(() => {

        if (formData.length === 0) return;

        setFormName(formData.form_name);
        setMedicName(formData.medic_name);
        setPatientName(formData.patient_name);
        setQuestions(formData.questions);

    }, [formData])


    const afirmativeResponse = (q, i) => {

        const response = q.response.yes ? "Sim" : "Não"

        return (

            <div className="resultCard afirmative-result">
                <p className="resultNumber">{i + 1}.</p>

                <div className="result-response-container">

                    <p className="question">{q.question}</p>
                    <div className="afirmative-response">
                        {/* Mostrar resposta e avaliação */}
                        <span>Resposta do paciente :</span>
                        <span className="resultCard-response">{response}</span>
                    </div>

                    <textarea className="evaluationField" placeholder="Faça a avaliação da resposta do paciente"></textarea>


                </div>
            </div>
        )
    }

    const descriptiveResponse = (q, i) => {


        console.log("q descriptive: ", q)

        const response = q.response.text;

        return (

            <div className="resultCard descriptive-result">
                <p className="resultNumber">{i + 1}.</p>

                <div className="result-response-container">
                    <p className="question">{q.question}</p>
                    <div className="descriptive-response">
                        <span>Resposta:</span>
                        <span className="resultCard-response">{response}</span>
                    </div>

                    <textarea className="evaluationField" placeholder="Faça a avaliação da resposta do paciente"></textarea>
                </div>

            </div>
        )
    }


    const numericResponse = (q, i) => {

        console.log("q numeric: ", q)

        const responseNumeric = q.response.numeric;
        const responseProcessed = q.response.processed;

        return (
            <div className="resultCard numeric-result">
                <p className="resultNumber">{i + 1}.</p>
                <div className="result-response-container">
                    <p className="question">{q.question}</p>

                    <div className="responses-type">

                        <div className="numeric-response">

                            <span>Resposta do paciente:</span>
                            <span className="resultCard-response">{responseNumeric}</span>

                        </div>

                        <div className="numeric-response">

                            <span>Resposta processada pela formula:</span>
                            <span className="resultCard-response">{responseProcessed}</span>

                        </div>

                    </div>

                    <textarea className="evaluationField" placeholder="Faça a avaliação da resposta do paciente"></textarea>
                </div>


            </div>
        )
    }

    return (
        <div className="form-result-container">
            <div className="back-container" onClick={() => navigate("/forms-area")}>
                <FontAwesomeIcon icon={faChevronLeft} />
                Voltar
            </div>
            <div>
                <div className="header-form">
                    <h1 className="form-title">{formName}</h1>
                    <p className="form-medic">Médico(a): {medicName}</p>
                    <p className="form-patient">Paciente: {patientName}</p>
                </div>

                <div className="questionCards-container">
                    {questions.map((q, i) => {
                        if (q.type === "afirmative") return afirmativeResponse(q, i);
                        if (q.type === "descriptive") return descriptiveResponse(q, i);
                        if (q.type === "numeric") return numericResponse(q, i);
                        return null;
                    })}
                </div>

            </div>

            <div className="btn-download">
                <button onClick={() => handleCreationForm()}>Baixar avaliação</button>
            </div>

        </div>
    )
}

export default FormResult
