import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Logo from "@assets/logo.png";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="HomePage-Container">
      <img className="img-logo" src={Logo} alt="logo" />

      <button
        className="btn-new-form"
        onClick={() => navigate("./form-creation")}
      >
        Novo questionário
      </button>

      <button
        className="btn-access-form"
        onClick={() => navigate("./forms-area")}
      >
        Visualizar respostas
      </button>

      <button
        className="btn-access-form"
        onClick={() => navigate("./form-template")}
      >
        Novo template
      </button>

      <button
        className="btn-access-form"
        onClick={() => navigate("./form-area-template")}
      >
        Visualizar template
      </button>


    </div>
  );
};

export default HomePage;
