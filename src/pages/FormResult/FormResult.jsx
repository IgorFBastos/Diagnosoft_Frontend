
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


    const [evaluations, setEvaluations] = useState({});


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

                    <textarea
                        className="evaluationField"
                        placeholder="Faça a avaliação da resposta do paciente"
                        value={evaluations[i] || ""}
                        onChange={(e) =>
                            setEvaluations((prev) => ({ ...prev, [i]: e.target.value }))
                        }
                    />


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

                    <textarea
                        className="evaluationField"
                        placeholder="Faça a avaliação da resposta do paciente"
                        value={evaluations[i] || ""}
                        onChange={(e) =>
                            setEvaluations((prev) => ({ ...prev, [i]: e.target.value }))
                        }
                    />
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

                    <textarea
                        className="evaluationField"
                        placeholder="Faça a avaliação da resposta do paciente"
                        value={evaluations[i] || ""}
                        onChange={(e) =>
                            setEvaluations((prev) => ({ ...prev, [i]: e.target.value }))
                        }
                    />
                </div>


            </div>
        )
    }

    const handleDownloadForm = () => {
        const doc = new jsPDF();

        const margin = 15;
        const pageWidth = doc.internal.pageSize.getWidth();
        const maxWidth = pageWidth - margin * 2;

        let yOffset = 20;

        doc.setFontSize(16);
        doc.text(`Avaliação: ${formName}`, margin, yOffset, { maxWidth });
        yOffset += 10;

        doc.setFontSize(12);
        doc.text(`Médico(a): ${medicName}`, margin, yOffset, { maxWidth });
        yOffset += 7;
        doc.text(`Paciente: ${patientName}`, margin, yOffset, { maxWidth });
        yOffset += 10;

        questions.forEach((q, index) => {
            doc.setFont(undefined, 'bold');
            const questionLines = doc.splitTextToSize(`${index + 1}. ${q.question}`, maxWidth);
            doc.text(questionLines, margin, yOffset);
            yOffset += questionLines.length * 7;

            doc.setFont(undefined, 'normal');

            if (q.type === "afirmative") {
                const response = `Resposta do paciente: ${q.response.yes ? "Sim" : "Não"}`;
                const responseLines = doc.splitTextToSize(response, maxWidth);
                doc.text(responseLines, margin, yOffset);
                yOffset += responseLines.length * 7;
            }

            if (q.type === "descriptive") {
                const response = `Resposta: ${q.response.text}`;
                const responseLines = doc.splitTextToSize(response, maxWidth);
                doc.text(responseLines, margin, yOffset);
                yOffset += responseLines.length * 7;
            }

            if (q.type === "numeric") {
                const result = `Resultado: ${q.response}`;
                const resultLines = doc.splitTextToSize(result, maxWidth);
                doc.text(resultLines, margin, yOffset);
                yOffset += resultLines.length * 7;
            }

            const evaluationText = evaluations[index];
            if (evaluationText) {
                doc.setFont(undefined, 'italic');
                const evaluationLines = doc.splitTextToSize(`Avaliação: ${evaluationText}`, maxWidth);
                doc.text(evaluationLines, margin, yOffset);
                yOffset += evaluationLines.length * 7;
            } else {
                yOffset += 5;
            }

            if (yOffset > 270) {
                doc.addPage();
                yOffset = 20;
            }
        });

        doc.save(`avaliacao-${formName || "formulario"}.pdf`);
    };


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
