import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import ModalQuestionCreation from '@components/Modal/ModalQuestionCreation';
import ModalFormCreation from '@components/Modal/ModalFormCreation'
import CardQuestion from '@components/CardQuestion/CardQuestion';

import api from "@service/apiService"

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

    useEffect(() => {
        console.log("questions: ", questions);
    }, [questions])

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

        console.log("question criadas:  ", questions)
        if (!questions.length || !nameQuestion || !nameMedic || !namePatient) {
            alert("Preencha todos os campos e crie pelo menos uma pergunta.");
            return;
        }

        const body = {
            form_name: nameQuestion,
            medic_name: nameMedic,
            patient_name: namePatient,
            status: "no-answered",
            questions: questions,
            link: ''
        }

        try {

            const response = await api.post("/api/forms/create", body)

            const formId = response.formId;
            const formUrl = `${window.location.origin}/form-response/${formId}`;
            setLinkForm(formUrl);

            await api.put(`/api/forms/update/${formId}`, {
                form_name: nameQuestion,
                medic_name: nameMedic,
                patient_name: namePatient,
                status: "no-answered",
                questions: questions,
                link: formUrl, 
            });

            setModalFormCreation(true);

        } catch (error) {
            console.error("Erro ao criar formulário:", error);
            alert("Erro ao criar formulário. Tente novamente.");
        }


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
