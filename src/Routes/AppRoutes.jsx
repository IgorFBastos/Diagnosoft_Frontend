

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "@pages/Home/HomePage"
import FormCreationPage from "@pages/FormCreation/FormCreationPage.jsx";
import FormPage from "@pages/Form/FormPage";
import FormsArea from "@pages/FormsArea/FormsArea";

const appRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/form-creation" element={<FormCreationPage/>}></Route>
                <Route path="/form-response/:id" element={<FormPage />} />
                <Route path="/forms-area" element={<FormsArea/>} />
            </Routes>
        </Router>
    )
}

export default appRoutes;

