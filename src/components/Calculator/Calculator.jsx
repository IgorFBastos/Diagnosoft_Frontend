import { useEffect, useState } from 'react';
import "./Calculator.css";

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

const Calculator = ({onSetQuestionFormula, onSetQuestionVariables}) => {

    const [formula, setFormula] = useState('');
    const [variables, setVariables] = useState([]);
    const [newVariable, setNewVariable] = useState('');

    useEffect(() => {
        onSetQuestionFormula(formula)
    }, [formula])

    useEffect(() => {
        onSetQuestionVariables(variables)
    },[variables])

    const handleButtonClick = (value) => {
        if (value === 'clear') {
            setFormula(null);
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

    return (
        <div className="calculator">
            <input
                className="display"
                type="text"
                value={formula}
                placeholder="Defina a formula"
                
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
                        <button key={i} onClick={() => handleButtonClick(v)}>
                            {v}
                        </button>
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
