import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons'

import "./FormPage.css";
import api from "@service/apiService"



const FormPage = () => {


    const { id } = useParams();


    const [formData, setFormData] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [formName, setFormName] = useState("");
    const [medicName, setMedicName] = useState("")
    const [patientName, setPatientName] = useState("")

    const [formSubmit, setFormSubmit] = useState(false);


    useEffect(() => {
        console.log("formData: ", formData)
    }, [formData]);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await api.get(`/api/forms/list/${id}`);

                console.log("response status: ", response);

                if (response.status === "no-answered") {
                    console.log("entrou aqui")
                    setFormData(response);
                } else {
                    setFormSubmit(true)
                }


            } catch (error) {
                console.error("Erro ao Pegar formulário:", error);
            }
        }
        fetchForm();
    }, [])


    useEffect(() => {

        if (formData.length === 0) return;

        setFormName(formData.form_name);
        setMedicName(formData.medic_name);
        setPatientName(formData.patient_name);
        setQuestions(formData.questions);

    }, [formData])



    const afirmativeQuestion = (q, i) => {

        const handleCheckboxQuestionYES = () => {
            const updated = [...questions];
            updated[i].response = { yes: true, no: false };
            setQuestions(updated);
        };

        const handleCheckboxQuestionNO = () => {
            const updated = [...questions];
            updated[i].response = { yes: false, no: true };
            setQuestions(updated);
        };

        return (

            <div className="questionCard afirmative-question">
                <p className="questionNumber">{i + 1}.</p>

                <div className="question-response-container">

                    <p className="question">{q.question}</p>
                    <div className="afirmative-input">
                        <div onClick={handleCheckboxQuestionYES}>
                            <FontAwesomeIcon icon={q.response.yes ? faCircleSolid : faCircleRegular} className="fa-icon" />
                            Sim
                        </div>
                        <div onClick={handleCheckboxQuestionNO}>
                            <FontAwesomeIcon icon={q.response.no ? faCircleSolid : faCircleRegular} className="fa-icon" />
                            Não
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    const descriptiveQuestion = (q, i) => {

        const handleDescriptiveResponse = (e) => {

            const updated = [...questions];
            updated[i].response.text = e.target.value;
            setQuestions(updated);
        }

        return (

            <div className="questionCard descriptive-question">
                <p className="questionNumber">{i + 1}.</p>
                <div className="question-response-container">
                    <p className="question">{q.question}</p>
                    <textarea
                        className="description-input"
                        placeholder="descreva sua resposta"
                        onChange={(e) => handleDescriptiveResponse(e)}></textarea>
                </div>
            </div>
        )
    }


    const numericQuestion = (q, i) => {

        console.log('q: ', q);

        const handleNumericResponse = (e) => {

            const updated = [...questions];
            updated[i].response.numeric = e.target.value;
            setQuestions(updated);
        }

        const handleNumericResponseVarible = (e, variableName) => {
            console.log(variableName)

            console.log("i: ", i);

            const updated = [...questions];

            updated[i].variables.map(variable => {
                if(variable.name === variableName) {
                    variable.response = e.target.value;
                }
            })


            console.log("updated: ", updated);
            setQuestions(updated);
        }

        return (
            <div className="questionCard numeric-question">
                <p className="questionNumber">{i + 1}.</p>
                <div className="question-response-container">
                    <p className="question">{q.question}</p>
                    
                    {q.variables.length > 0 ?
                        q.variables.map(variable => (
                            <div>
                                {variable.name} <br/> <input
                                className="number-input"
                                type="number"
                                variableName={`variable.name`}
                                placeholder={`Digite ${variable.name}`}
                                onChange={(e) => handleNumericResponseVarible(e, variable.name)} />
                            </div>
                        ))
                        :
                        <input
                            className="number-input"
                            type="number"
                            placeholder="digite sua resposta"
                            onChange={(e) => handleNumericResponse(e)} />
                    }
                </div>
            </div>
        )
    }


    const handleSubmitQuestions = async () => {

        // TODO: FAZER CONFIRMAÇÃO SE O USUÁRIO QUER MESMO ENVIAR O FORMULÁRIO E VERIFICAR SE TODAS PERGUNTAS FORAM RESPONDIDAS


        const confirmed = window.confirm("Tem certeza que deseja enviar o questionário?");
        if (!confirmed) return;

        const body = {
            form_name: formName,
            medic_name: medicName,
            patient_name: patientName,
            status: "answered",
            questions: questions,
        }

        try {
            const response = await api.put(`/api/forms/update/${id}`, body)

            console.log(response);
            setFormSubmit(true);

        } catch (error) {
            console.log("Erro ao enviar questionário. ", error)
            alert("Erro ao enviar questionario.");
        }
    }

    return (
        <div className="form-response-container">
            {!formSubmit ? (
                <div>
                    <div className="header-form">
                        <h1 className="form-title">{formName}</h1>
                        <p className="form-medic">Médico(a): {medicName}</p>
                        <p className="form-patient">Paciente: {patientName}</p>
                    </div>

                    <div className="questionCards-container">
                        {questions.map((q, i) => {
                            if (q.type === "afirmative") return afirmativeQuestion(q, i);
                            if (q.type === "descriptive") return descriptiveQuestion(q, i);
                            if (q.type === "numeric") return numericQuestion(q, i);
                            return null;
                        })}
                    </div>

                    {questions.length > 0 && (
                        <div className="btn-submit-form">
                            <button onClick={handleSubmitQuestions}>Enviar Questionário</button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="form-submit-sucess">
                    <p>
                        Formulário foi enviado com sucesso!   :)
                    </p>
                    <p>
                        O médico responsável retornará com sua avaliação assim que possível.
                    </p>
                </div>
            )}
        </div>
    );
}

export default FormPage;