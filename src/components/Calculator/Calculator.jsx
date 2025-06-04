import { useEffect, useState, useRef } from 'react';
import "./Calculator.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const operatorButtons = [
    { label: '.', value: '.' },
    { label: '√', value: 'sqrt(' },
    { label: '^', value: '^' },
    { label: '×', value: '*' },
    { label: '÷', value: '/' },
    { label: '+', value: '+' },
    { label: '-', value: '-' },
    { label: '(', value: '(' },
    { label: ')', value: ')' },
    { label: 'Limpar', value: 'clear' },
    { label: '←', value: 'back' }
];

const numberButtons = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '0', value: '0' },
];

const Calculator = ({ onSetQuestionFormula, onSetQuestionVariables }) => {

    const [formula, setFormula] = useState('');
    const [variables, setVariables] = useState([]);
    const [newVariable, setNewVariable] = useState('');

    const inputRef = useRef(null);

    useEffect(() => {
        onSetQuestionFormula(formula)
        if (inputRef.current) {
            inputRef.current.scrollLeft = inputRef.current.scrollWidth;
        }
    }, [formula])

    useEffect(() => {
        onSetQuestionVariables(variables)
    }, [variables])

    const handleButtonClick = (value) => {
        if (value === 'clear') {
            setFormula("");
        } else if (value === 'back') {
            setFormula(formula.slice(0, -1));
        } else {
            setFormula(prev => prev + value);
        }
    };

    const handleAddVariable = () => {
        const trimmed = newVariable.trim();
        if (trimmed && !variables.includes(trimmed)) {
            setVariables([...variables, trimmed]);
            setNewVariable('');
        }
    };

    const handleRemoveVariable = (variableToRemove) => {
        setVariables(variables.filter(v => v !== variableToRemove));
    };
    

    return (
        <div className="calculator">
            <input
                className="display"
                ref={inputRef}
                type="text"
                value={formula}
                placeholder="Defina a formula"
                onChange={(e) => setFormula(e.target.value)}
            />

            <div className="variable-creator">
                <input
                    type="text"
                    value={newVariable}
                    onChange={e => setNewVariable(e.target.value)}
                    placeholder="Defina a variável"
                />
                <button onClick={handleAddVariable}>Adicionar</button>
            </div>

            {variables.length > 0 && (
                <div className="variable-buttons">
                    {variables.map((v, i) => (
                        <div key={i} className="variable-item">
                            <button onClick={() => handleButtonClick(v)}>
                                {v}
                            </button>
                            <button
                                className="remove-variable"
                                onClick={() => handleRemoveVariable(v)}
                                title={`Remover variável "${v}"`}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="buttons-grid">
                {[...numberButtons, ...operatorButtons].map((btn, i) => (
                    <button
                        key={i}
                        onClick={() => handleButtonClick(btn.value)}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Calculator;
