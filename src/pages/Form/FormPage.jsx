import { UNSAFE_decodeViaTurboStream, useSearchParams } from 'react-router-dom';

import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons'

import "./FormPage.css";



const FormPage = () => {
    const [searchParams] = useSearchParams();

    const initialQuestions = JSON.parse(searchParams.get('questions') || '[]');
    const title = searchParams.get('title') || '';
    const medic = searchParams.get('medic') || '';
    const patient = searchParams.get('patient') || '';


    const [questions, setQuestions] = useState(initialQuestions);


    console.log("questions: ", questions)


    const afirmativeQuestion = (question, i) => {


        const handleCheckboxQuestionYES = () => {
            const updated = [...questions];
            updated[index].response = { yes: true, no: false };
            setQuestions(updated);
        };

        const handleCheckboxQuestionNO = () => {
            const updated = [...questions];
            updated[index].response = { yes: false, no: true };
            setQuestions(updated);
        };

        return (

            <div className="questionCard afirmative-question">
                <p className="questionNumber">{i}.</p>

                <div className="question-response-container">

                    <p className="question">{question}</p>
                    <div className="afirmative-input">
                        <div onClick={handleCheckboxQuestionYES}>
                            <FontAwesomeIcon icon={faCircleSolid} className="fa-icon" />
                            sim
                        </div>
                        <div onClick={handleCheckboxQuestionNO}>
                            <FontAwesomeIcon icon={faCircleRegular} className="fa-icon" />
                            não
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    const descriptiveQuestion = (question, i) => {

        return (

            <div className="questionCard descriptive-question">
                <p className="questionNumber">{i}.</p>
                <div className="question-response-container">
                    <p className="question">{question}</p>
                    <textarea className="description-input" name="" id="" placeholder="descreva sua resposta"></textarea>
                </div>
            </div>
        )
    }


    const numericQuestion = (question, i) => {

        return (
            <div className="questionCard numeric-question">
                <p className="questionNumber">{i}.</p>
                <div className="question-response-container">
                    <p className="question">{question}</p>
                    <input className="number-input" type="number" placeholder="digite sua resposta" />
                </div>
            </div>
        )
    }

    return (
        <div className="form-response-container">



            <div className="header-form">
                <h1 className="form-title">{title}</h1>
                <p className="form-medic">Médico (a): {medic}</p>
                <p className="form-patient">Paciente: {patient}</p>

            </div>

            <div className="questionCards-container">
                {/* Renderiza as perguntas aqui */}
                {questions.map((q, i) => {

                    console.log(q)
                    if (q.type === "afirmative") {
                        return afirmativeQuestion(q.question, i + 1);
                    }

                    if (q.type === "descriptive") {
                        return descriptiveQuestion(q.question, i + 1);
                    }

                    if (q.type === "numeric") {
                        return numericQuestion(q.question, i + 1);
                    }
                })}

            </div>

            {/* {questions.lenght && ( */}
                <div className="btn-submit-form">
                    <button>Enviar Questionário</button>
                </div>
            {/* )} */}

        </div>
    );
};

export default FormPage;