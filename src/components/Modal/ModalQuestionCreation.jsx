
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'



import "./Modal.css"


const ModalQuestionCreation = ({ onClose, onCreateQuestion, onEditQuestion, existingQuestion }) => {

    const [isNumeric, setIsNumeric] = useState(false);

    const [questionText, setQuestionText] = useState("");
    const [questionType, setQuestionType] = useState("afirmative");
    const [questionFormula, setQuestionFormula] = useState(null);

    useEffect(() => {
        if (existingQuestion) {
            setQuestionText(existingQuestion.question);
            setQuestionType(existingQuestion.type);
            setIsNumeric(existingQuestion.type === 'numeric');
        }
    }, [existingQuestion]);

    const handleTypeChange = (e) => {
        const selected = e.target.value;

        setQuestionType(selected);

        if (selected === 'numeric') {
            setIsNumeric(true);

        } else {
            setIsNumeric(false)
        }
    };

    const handleSave = () => {
        
        if(!questionText) {
            alert("Digite uma pergunta!");
            return;
        }

        const newQuestion = {
            question: questionText,
            type: questionType,
            formula: questionFormula
        };

        if (existingQuestion) {
            onEditQuestion(newQuestion);
        } else {
            onCreateQuestion(newQuestion);
        }
    };

    return (
        <div className="modal-overlay">

            <div className="Modal-container">
                <FontAwesomeIcon icon={faXmark} onClick={() => onClose(false)} />
                <div className="question-container">
                    <h2>Pergunta:</h2>
                    <textarea
                        rows="4"
                        placeholder="Digite a pergunta aqui..."
                        onChange={(e) => setQuestionText(e.target.value)}
                    />
                </div>

                <div className="questionType-container">
                    <h2>Tipo da Resposta:</h2>
                    <select onChange={handleTypeChange}>
                        <option value="afirmative">Afirmativa</option>
                        <option value="descriptive">Descritiva</option>
                        <option value="numeric">Numérica</option>
                    </select>
                </div>

                {isNumeric && (
                    <div className="formula-container">

                        <div className="input-container">
                            <input type="text" placeholder="Digite uma fórmula se necessário" />
                        </div>

                        <div>
                            {/* Aqui vai o código para exibir a calculadora de formulas  */}
                            Aqui teremos a calculadora que será implementada futuramente
                        </div>
                    </div>
                )}

                <div className="btn-create-question-container">
                    <button onClick={() => handleSave()}>
                        {existingQuestion ? "Salvar Alterações" : "Criar"}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ModalQuestionCreation;
