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
        Acessar questionários
      </button>
    </div>
  );
};

export default HomePage;
