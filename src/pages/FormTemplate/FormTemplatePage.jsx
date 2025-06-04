
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import ModalQuestionCreation from '@components/Modal/ModalQuestionCreation';

import CardQuestion from '@components/CardQuestion/CardQuestion';

import api from "@service/apiService"




const FormGeneric = () => {
    const navigate = useNavigate();

    const [showModalQuestionCreation, setShowModalQuestionCreation] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);
    const [nameQuestion, setNameQuestion] = useState("");
    const [nameMedic, setNameMedic] = useState("");


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

    const handleCreationTemplateForm = async () => {

        const confirmed = window.confirm("Tem certeza que deseja criar o questionário?");
        if (!confirmed) return;


        console.log("question criadas:  ", questions)
        if (!questions.length || !nameQuestion || !nameMedic) {
            alert("Preencha todos os campos e crie pelo menos uma pergunta.");
            return;
        }

        const body = {
            template_name: nameQuestion,
            medic_name: nameMedic,
            questions: questions,
        }

        try {

            const response = await api.post("/api/forms/form-template/createTemplate", body)
            console.log(response)
            alert("Questionário Criado com sucesso!");
            navigate("/");

        } catch (error) {
            console.error("Erro ao criar formulário:", error);
            alert("Erro ao criar formulário. Tente novamente.");
        }


    };






    const handleCloseModal = () => {
        setShowModalQuestionCreation(false);
        setEditingQuestionIndex(null);
    }


    const handleDeleteQuestion = (index) => {
        const confirmed = window.confirm("Tem certeza que deseja excluir esta pergunta?");
        if (!confirmed) return;

        setQuestions(prev => prev.filter((_, i) => i !== index));

    }


    return (
        <div className="FormCreation-container">

            <div className="back-container" onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faChevronLeft} />
                Voltar
            </div>
            <div className="card-container">

                <div className="inputs-container">
                    <div>
                        <h2>Nome do Questionário</h2>
                        <input type="text" onChange={(e) => setNameQuestion(e.target.value)} />
                    </div>

                    <div>
                        <h2>Nome do Médico</h2>
                        <input type="text" onChange={(e) => setNameMedic(e.target.value)} />
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
                            }}
                            onDelete={() => handleDeleteQuestion(index)}
                        />
                    ))}
                </div>

                {questions.length > 0 ?
                    <div className="btn-generate-report">
                        <button onClick={() => handleCreationTemplateForm()}>Gerar Questionário</button>
                    </div>
                    : ""
                }


                {showModalQuestionCreation && (
                    <ModalQuestionCreation
                        onClose={handleCloseModal}
                        onCreateQuestion={handleCreateQuestion}
                        onEditQuestion={handleEditQuestion}
                        existingQuestion={editingQuestionIndex !== null ? questions[editingQuestionIndex] : null} />
                )}


            </div>
        </div>
    )
}

export default FormGeneric;
