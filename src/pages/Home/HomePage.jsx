// Aqui é o "html" de um projeto react, ele sempre deve ser retornado pelo componente e sempre tem q ter uma div pai
// que encapsula todo esse html, nesse caso, HomePage-Container é esse cara, se vc colocar uma outra div no mesmo nivel,
// ou seja, fora dessa div, terá um erro. Dentro do HomePage-Container pode mudar a estrutura como quiser para ajustar o estilo.

// Outro adento é que quando for adicionar uma classe em um elemento aqui em react usamos className em vez de class como no HTML comum.

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
        onClick={() => navigate("./questionarios")}
      >
        Acessar questionários
      </button>
    </div>
  );
};

export default HomePage;
