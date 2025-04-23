import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import ModalQuestionCreation from '@components/Modal/ModalQuestionCreation';
import ModalFormCreation from '@components/Modal/ModalFormCreation'
import CardQuestion from '@components/CardQuestion/CardQuestion';

const FormCreationPage = () => {

    const navigate = useNavigate();

    const [showModalQuestionCreation, setShowModalQuestionCreation] = useState(false);
    const [showModalFormCreation, setModalFormCreation] = useState(false);
    const [linkForm, setLinkForm] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);
    const [nameQuestion, setNameQuestion] = useState("");
    const [nameMedic, setNameMedic] = useState("");
    const [namePatient,  setNamePatient] = useState("");

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

    const handleCreationForm = () => {

        if (!questions.length) {
            alert("Nenhuma pergunta foi criada para gerar o questionário!")
            return;
        }

        if (!nameQuestion) {
            alert("Defina o nome do questionário!")
            return;
        }

        if (!nameMedic) {
            alert("Defina o nome do médico!")
            return;
        }

        if (!namePatient) {
            alert("Defina o nome do paciente!")
            return;
        }

    

        const encodedQuestions = encodeURIComponent(JSON.stringify(questions));
        const encodedNameQuestion = encodeURIComponent(nameQuestion);
        const encodedNameMedic = encodeURIComponent(nameMedic);
        const encodedNamePatient = encodeURIComponent(namePatient);
        
        console.log("encodedQuestions: ", encodedQuestions)
        const link = `${window.location.origin}/form-response?questions=${encodedQuestions}&title=${encodedNameQuestion}&medic=${encodedNameMedic}&patient=${encodedNamePatient}`;

        setLinkForm(link);
        setModalFormCreation(true);
    }


    return (
        <div className="FormCreation-container">

            <div className="back-container" onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faChevronLeft} />
                Voltar
            </div>
            <div className="inputs-container">
                <div>
                    <h2>Nome do Questionário</h2>
                    <input type="text" onChange={(e) => setNameQuestion(e.target.value)}/>
                </div>

                <div>
                    <h2>Nome do Médico</h2>
                    <input type="text" onChange={(e) => setNameMedic(e.target.value)}/>
                </div>

                <div>
                    <h2>Nome do Paciente</h2>
                    <input type="text" onChange={(e) => setNamePatient(e.target.value)}/>
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
