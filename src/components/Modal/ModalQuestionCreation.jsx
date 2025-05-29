import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import Calculator from "@components/Calculator/Calculator";

import "./Modal.css";


const ModalQuestionCreation = ({
  onClose,
  onCreateQuestion,
  onEditQuestion,
  existingQuestion,
}) => {

  const [isNumeric, setIsNumeric] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("afirmative");
  const [questionFormula, setQuestionFormula] = useState(null);
  const [questionVariables, setQuestionVariables] = useState(null);
  const [variablesData, setVariablesData] = useState(null);

  useEffect(() => {
    if(!questionVariables) return;
    
    const formattedVariables = questionVariables.map((variable) => ({
      name: variable,
      response: null,
    }));
    setVariablesData(formattedVariables)
  }, [questionVariables])



  useEffect(() => {
    if (existingQuestion) {
      setQuestionText(existingQuestion.question);
      setQuestionType(existingQuestion.type);
      setIsNumeric(existingQuestion.type === "numeric");
    }
  }, [existingQuestion]);

  const handleTypeChange = (e) => {
    const selected = e.target.value;

    setQuestionType(selected);

    if (selected === "numeric") {
      setIsNumeric(true);
    } else {
      setIsNumeric(false);
    }
  };

  const handleSave = () => {
    if (!questionText) {
      alert("Digite uma pergunta!");
      return;
    }

    const newQuestion = {
      question: questionText,
      type: questionType,
      formula: questionType === "numeric" ? questionFormula || null : null,
      response: getInitialResponse(questionType),
      variables: variablesData
    };

    if (existingQuestion) {
      onEditQuestion(newQuestion);
    } else {
      onCreateQuestion(newQuestion);
    }
  };

  const getInitialResponse = (type) => {
    if (type === "afirmative") {
      return { yes: true, no: false };
    }

    if (type === "descriptive") {
      return { text: "" };
    }

    if (type === "numeric") {
      return { numeric: null, processed: null };
    }

    return null;
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
          <select onChange={handleTypeChange} value={questionType}>
            <option value="afirmative">Afirmativa</option>
            <option value="descriptive">Descritiva</option>
            <option value="numeric">Numérica</option>
          </select>
        </div>

        {isNumeric && (
          <div className="formula-container">
              <Calculator onSetQuestionFormula={setQuestionFormula} onSetQuestionVariables={setQuestionVariables}/>
          </div>
        )}

        <div className="btn-create-question-container">
          <button onClick={() => handleSave()}>
            {existingQuestion ? "Salvar Alterações" : "Criar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalQuestionCreation;
