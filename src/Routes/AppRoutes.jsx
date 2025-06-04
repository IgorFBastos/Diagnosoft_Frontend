

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "@pages/Home/HomePage"
import FormCreationPage from "@pages/FormCreation/FormCreationPage.jsx";
import FormPage from "@pages/Form/FormPage";
import FormsArea from "@pages/FormsArea/FormsArea";
import FormResult from "@pages/FormResult/FormResult";
import FormTemplate from "@pages/FormTemplate/FormTemplatePage";
import FormTemplateArea from "@pages/FormTemplateArea/FormTemplateArea";
import FormCreationTemplate from "../pages/FormCreationTemplate/FormCreationTemplate";

const appRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/form-creation" element={<FormCreationPage/>}></Route>
                <Route path="/form-response/:id" element={<FormPage />} />
                <Route path="/forms-area" element={<FormsArea/>} />
                <Route path="/form-result/:id" element={<FormResult />} />
                <Route path="/form-template" element={<FormTemplate  />} />
                <Route path="/form-area-template" element={<FormTemplateArea  />} />
                <Route path="/form-creation-generic/:id" element={<FormCreationTemplate />} />
                
            

            </Routes>
        </Router>
    )
}

export default appRoutes;

