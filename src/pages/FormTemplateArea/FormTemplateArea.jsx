import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import CardFormTemplate from "@components/CardFormTemplate/CardFormTemplate"

import api from "@service/apiService"


const FormGenericArea = () => {
    const navigate = useNavigate();

    const [forms, setForms] = useState([]);



    useEffect(() => {

        console.log("buscando todos os forms");

        const fetchGetAllForms = async () => {

            try {

                const response = await api.get("/api/forms/form-template/listTemplates");

                // console.log("response: ", response);
                setForms(response);

            } catch (error) {
                console.error("erro ao pegar todos os formulários no db.", error)
            }

        }

        fetchGetAllForms();

    }, [])




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
                        return <CardFormTemplate form={form} />
                    })}
                </div> :

                <div className="info-not-forms">
                    Nenhum questionário encontrado.
                </div>
            }



        </div>
    )
}

export default FormGenericArea;
