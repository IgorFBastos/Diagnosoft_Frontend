import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import ModalQuestionCreation from '@components/Modal/ModalQuestionCreation';
import ModalFormCreation from '@components/Modal/ModalFormCreation'
import CardQuestion from '@components/CardQuestion/CardQuestion';

import "./FormCreationPage.css";


const FormCreationPage = () => {

    const navigate = useNavigate();

    const [showModalQuestionCreation, setShowModalQuestionCreation] = useState(false);
    const [showModalFormCreation, setModalFormCreation] = useState(false);
    const [linkForm, setLinkForm] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);
    const [nameQuestion, setNameQuestion] = useState("");
    const [nameMedic, setNameMedic] = useState("");
    const [namePatient, setNamePatient] = useState("");

    const handleCreateQuestion = (newQuestion) => {
        setQuestions(prev => [...prev, newQuestion]);
        setShowModalQuestionCreation(false);
    };

    const handleEditQuestion = (updatedQuestion) => {
        const newQuestions = [...questions];
        newQuestions[editingQuestionIndex] = updatedQuestion;
        setQuestions(newQuestions);
        setEditingQuestionIndex(null);
        setShowModalQuestionCreation(false);
    };

    const handleCreationForm = async () => {
        if (!questions.length || !nameQuestion || !nameMedic || !namePatient) {
            alert("Preencha todos os campos e crie pelo menos uma pergunta.");
            return;
        }

        const response = await fetch("http://localhost:5000/api/forms/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                form_name: nameQuestion,
                medic_name: nameMedic,
                patient_name: namePatient,
                questions: questions,
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro da API:", errorText);
            return;
        }

        const data = await response.json();

        const formUrl = `${window.location.origin}/form-response/${data.formId}`;
        setLinkForm(formUrl);
        setModalFormCreation(true); 
    };


    return (
        <div className="FormCreation-container">

            <div className="back-container" onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faChevronLeft} />
                Voltar
            </div>
            <div className="inputs-container">
                <div>
                    <h2>Nome do Questionário</h2>
                    <input type="text" onChange={(e) => setNameQuestion(e.target.value)} />
                </div>

                <div>
                    <h2>Nome do Médico</h2>
                    <input type="text" onChange={(e) => setNameMedic(e.target.value)} />
                </div>

                <div>
                    <h2>Nome do Paciente</h2>
                    <input type="text" onChange={(e) => setNamePatient(e.target.value)} />
                </div>
            </div>

            <div className="btn-new-question">
                <button onClick={() => setShowModalQuestionCreation(true)}>+</button>
            </div>

            <div className="questions-container">
                {questions.map((q, index) => (
                    <CardQuestion
                        question={q.question}
                        type={q.type}
                        number={index + 1}
                        onEdit={() => {
                            setEditingQuestionIndex(index);
                            setShowModalQuestionCreation(true);
                        }} />
                ))}
            </div>


            <div className="btn-generate-report">
                <button onClick={() => handleCreationForm()}>Gerar Questionário</button>
            </div>


            {showModalQuestionCreation && (
                <ModalQuestionCreation
                    onClose={setShowModalQuestionCreation}
                    onCreateQuestion={handleCreateQuestion}
                    onEditQuestion={handleEditQuestion}
                    existingQuestion={editingQuestionIndex !== null ? questions[editingQuestionIndex] : null} />
            )}

            {showModalFormCreation && (
                <ModalFormCreation
                    onClose={setModalFormCreation}
                    link={linkForm} />
            )}


        </div>
    )
}

export default FormCreationPage
