

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "@pages/Home/HomePage"
import FormCreationPage from "@pages/FormCreation/FormCreationPage.jsx";


const appRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/form-creation" element={<FormCreationPage/>}></Route>
            </Routes>
        </Router>
    )
}

export default appRoutes;

