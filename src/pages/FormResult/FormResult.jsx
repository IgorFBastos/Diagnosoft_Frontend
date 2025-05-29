
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import { useNavigate } from "react-router-dom";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import api from "@service/apiService"

import "./FormResult.css"



const FormResult = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const printRef = useRef()

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

        return (
            <div className="resultCard numeric-result">
                <p className="resultNumber">{i + 1}.</p>
                <div className="result-response-container">
                    <p className="question">{q.question}</p>

                    <div className="responses-type">

                        <div className="numeric-response">
                            {q.formula ?
                                <>
                                    <span>Formula aplicada:</span>
                                    <span className="resultCard-response">{q.formula}</span>
                                </>
                                : ""
                            }
                        </div>

                        <div className="numeric-response numeric-response-variables">
                            {q.variables ? q.variables.map(variable => {
                                return (
                                    <div className="variables-infos">
                                        <span>Resposta do campo {variable.name}:</span>
                                        <span className="resultCard-response">{variable.response}</span>
                                    </div>
                                )
                            })
                                : ""
                            }
                        </div>

                        <div className="numeric-response">
                            <span>Resposta processada pela formula:</span>
                            <span className="resultCard-response">{q.response}</span>
                        </div>

                    </div>

                    <textarea className="evaluationField" placeholder="Faça a avaliação da resposta do paciente"></textarea>
                </div>


            </div>
        )
    }

    const handleDownloadForm = async () => {

        console.log("baixar avaliação")

        // Passar a avaliação para PDF

        const element = printRef.current;

        console.log("element: " ,element)

        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 2, // melhor resolução
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`avaliacao-${formName || "formulario"}.pdf`);
    }

    return (
        <div className="form-result-container">
            <div className="back-container" onClick={() => navigate("/forms-area")}>
                <FontAwesomeIcon icon={faChevronLeft} />
                Voltar
            </div>
            <div ref={printRef}>
                <div className="header-form" >
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
                <button onClick={() => handleDownloadForm()}>Baixar avaliação</button>
            </div>

        </div>
    )
}

export default FormResult
