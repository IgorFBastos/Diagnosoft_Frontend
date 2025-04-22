import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'


import ModalFormCreation from '@components/Modal/ModalFormCreation';
import CardQuestion from '@components/CardQuestion/CardQuestion';

const FormCreationPage = () => {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);

    const handleCreateQuestion = (newQuestion) => {
        setQuestions(prev => [...prev, newQuestion]);
        setShowModal(false);
    };

    const handleEditQuestion = (updatedQuestion) => {
        const newQuestions = [...questions];
        newQuestions[editingQuestionIndex] = updatedQuestion;
        setQuestions(newQuestions);
        setEditingQuestionIndex(null);
        setShowModal(false);
    };


    useEffect(() => {
        console.log("questions: ", questions);
    }, [questions])


    return (
        <div className="FormCreation-container">

            <div className="back-container" onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faChevronLeft} />
                Voltar
            </div>
            <div className="inputs-container">
                <div>
                    <h2>Nome do Questionário</h2>
                    <input type="text" />
                </div>

                <div>
                    <h2>Nome do Médico</h2>
                    <input type="text" />
                </div>

                <div>
                    <h2>Nome do Paciente</h2>
                    <input type="text" />
                </div>
            </div>

            <div className="btn-new-question">
                <button onClick={() => setShowModal(true)}>+</button>
            </div>

            <div className="questions-container">
                {questions.map((q, index) => (
                    <CardQuestion
                        question={q.question}
                        type={q.type}
                        number={index + 1}
                        onEdit={() => {
                            setEditingQuestionIndex(index);
                            setShowModal(true);
                        }} />
                ))}
            </div>


            <div className="btn-generate-report">
                <button>Gerar Relatório</button>
            </div>


            {showModal && (
                <ModalFormCreation
                    onClose={setShowModal}
                    onCreateQuestion={handleCreateQuestion}
                    onEditQuestion={handleEditQuestion}
                    existingQuestion={editingQuestionIndex !== null ? questions[editingQuestionIndex] : null} />
            )}

        </div>
    )
}

export default FormCreationPage
