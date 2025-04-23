import { UNSAFE_decodeViaTurboStream, useSearchParams } from 'react-router-dom';

const FormPage = () => {
    const [searchParams] = useSearchParams();

    const questions = JSON.parse(searchParams.get('questions') || '[]');
    const title = searchParams.get('title') || '';
    const medic = searchParams.get('medic') || '';
    const patient = searchParams.get('patient') || '';

    const afirmativeQuestion = (question, i) => {
        return (
            <div className="question afirmative-question">
                <p>{i}. {question}</p>
                <div>
                    sim
                </div>
                <div>
                    não
                </div>
            </div>
        )
    }

    const descriptiveQuestion = (question, i) => {

        return(
            <div className="quastion descriptive-question">
                <p>{i}. {question}</p>
                <input type="text" />
            </div>
        )
    }


    const numericQuestion = (question, i) => {

        return (
            <div className="question numeric-question">
                <p>{i}. {question}</p>
                <input type="number" />
            </div>
        )
    }

    return (
        <div>
            <h1>{title}</h1>
            <p>Médico (a): {medic}</p>
            <p>Paciente: {patient}</p>

            {/* Renderiza as perguntas aqui */}
            {questions.map((q, i) => {
                
                console.log(q)
                if(q.type === "afirmative") {
                    return afirmativeQuestion(q.question, i);
                }

                if(q.type === "descriptive") {
                    return descriptiveQuestion(q.question, i);
                }
                
                if(q.type === "numeric") {
                    return numericQuestion(q.question, i);
                }
            })}


            <div className="btn-submit-form">
                <button>Enviar Questionário</button>
            </div>
        </div>
    );
};

export default FormPage;
