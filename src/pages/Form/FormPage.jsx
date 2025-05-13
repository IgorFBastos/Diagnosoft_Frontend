import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons'

import "./FormPage.css";



const FormPage = () => {


    const { id } = useParams();


    const [questions, setQuestions] = useState([]);


    useEffect(()  => {

        console.log("useEffect executado: ", id);

        const fetchForm = async () => {

            const response = await fetch(`http://localhost:5000/api/forms/list/${id}`, {
                method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            
        })
        
        if (!response.ok) {
            
            const errorText = await response.text();
            console.error("Erro da API:", errorText);
            return;
        }
        
        const data = await response.json();
        
        console.log("data: ", data)
    }

    fetchForm();
        
        
    }, [])

    const afirmativeQuestion = (q, i) => {


        console.log("questionAfirmative: ", q);

        const handleCheckboxQuestionYES = () => {
            const updated = [...questions];

            console.log("update: ", updated[i])
            updated[i].response = { yes: true, no: false };
            setQuestions(updated);
        };

        const handleCheckboxQuestionNO = () => {
            const updated = [...questions];
            updated[i].response = { yes: false, no: true };
            setQuestions(updated);
        };

        return (

            <div className="questionCard afirmative-question">
                <p className="questionNumber">{i + 1}.</p>

                <div className="question-response-container">

                    <p className="question">{q.question}</p>
                    <div className="afirmative-input">
                        <div onClick={handleCheckboxQuestionYES}>
                            <FontAwesomeIcon icon={q.response.yes ? faCircleSolid : faCircleRegular} className="fa-icon" />
                            sim
                        </div>
                        <div onClick={handleCheckboxQuestionNO}>
                            <FontAwesomeIcon icon={q.response.no ? faCircleSolid : faCircleRegular} className="fa-icon" />
                            não
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    const descriptiveQuestion = (q, i) => {

        const handleDescriptiveResponse = (e) => {

            const updated = [...questions];
            updated[i].response.text = e.target.value;
            setQuestions(updated);
        }

        return (

            <div className="questionCard descriptive-question">
                <p className="questionNumber">{i + 1}.</p>
                <div className="question-response-container">
                    <p className="question">{q.question}</p>
                    <textarea
                        className="description-input"
                        placeholder="descreva sua resposta"
                        onChange={(e) => handleDescriptiveResponse(e)}></textarea>
                </div>
            </div>
        )
    }


    const numericQuestion = (q, i) => {

        const handleNumericResponse = (e) => {

            const updated = [...questions];
            updated[i].response.numeric = e.target.value;
            setQuestions(updated);
        }

        return (
            <div className="questionCard numeric-question">
                <p className="questionNumber">{i + 1}.</p>
                <div className="question-response-container">
                    <p className="question">{q.question}</p>
                    <input
                        className="number-input"
                        type="number"
                        placeholder="digite sua resposta"
                        onChange={(e) => handleNumericResponse(e)} />
                </div>
            </div>
        )
    }


    const handleSubmitQuestions = () => {
        alert("Ainda não implementado backend para enviar as questions.")
    }

    return (
        <div className="form-response-container">



            <div className="header-form">
                <h1 className="form-title"></h1>
                <p className="form-medic">Médico (a): </p>
                <p className="form-patient">Paciente: </p>

            </div>

            <div className="questionCards-container">
                {/* Renderiza as perguntas aqui */}
                {questions.map((q, i) => {

                    console.log(q)
                    if (q.type === "afirmative") {
                        return afirmativeQuestion(q, i);
                    }

                    if (q.type === "descriptive") {
                        return descriptiveQuestion(q, i);
                    }

                    if (q.type === "numeric") {
                        return numericQuestion(q, i);
                    }
                })}

            </div>

            {/* {questions.lenght && ( */}
            <div className="btn-submit-form">
                <button onClick={handleSubmitQuestions}>Enviar Questionário</button>
            </div>
            {/* )} */}

        </div>
    );
};

export default FormPage;