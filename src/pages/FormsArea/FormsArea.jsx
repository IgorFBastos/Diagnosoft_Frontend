import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import CardForms from "@components/CardForms/CardForms"

import api from "@service/apiService"

import "./FormsArea.css"


const FormsArea = () => {

    const navigate = useNavigate();

    const [forms, setForms] = useState([]);

    useEffect(() => {
        console.log("forms mudou: ", forms);
    }, [forms])


    useEffect(() => {

        console.log("buscando todos os forms");

        const fetchGetAllForms = async () => {

            try {

                const response = await api.get("/api/forms/list/all");

                console.log("response: ", response);
                setForms(response);

            } catch (error) {
                console.error("erro ao pegar todos os formulários no db.", error)
            }

        }

        fetchGetAllForms();

    }, [])


    const handleDeleteForm = (idForm) => {

        const confirmed = window.confirm("Tem certeza que deseja excluir este questionário?");
        if (!confirmed) return;

        setForms(prev => prev.filter(form => form._id !== idForm))
    }




    return (
        <div className="forms-area">

            <div className="header-container">
                <div className="back-container" onClick={() => navigate("/")}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    Voltar
                </div>


                <div className="search-bar">
                    <input type="text" placeholder="Pesquisar" />
                </div>
            </div>

            {forms.length !== 0 ?
                <div className="card-forms-container">
                    {forms.map((form) => {
                        return <CardForms form={form} onDeleteForm={handleDeleteForm} />
                    })}
                </div> :

                <div className="info-not-forms">
                    Nenhum questionário encontrado.
                </div>
            }



        </div>
    )
}

export default FormsArea
