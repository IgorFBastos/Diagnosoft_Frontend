# Diagnosoft – Sistema de Apoio ao Diagnóstico Clínico

## 📖 Descrição do Projeto
O Diagnosoft é uma plataforma desenvolvida para auxiliar profissionais da saúde na criação e gerenciamento de formulários clínicos personalizados, visando aprimorar o processo de diagnóstico de pacientes. O sistema permite a coleta estruturada de dados, facilitando a análise e tomada de decisões clínicas.

É um sistema voltado para profissionais da saúde, desenvolvido a partir de demandas observadas no curso de Fisioterapia da UFSC. Atualmente, a coleta de dados clínicos é feita por meio de questionários físicos, utilizados para triagem e definição de tratamentos, além de servirem como referência para consultas futuras.

Um dos exemplos é o diagnóstico de sarcopenia, que exige a aplicação de fórmulas matemáticas para avaliar perda de massa e força muscular.

Este projeto foi desenvolvido como parte da disciplina Projeto Integrador I, com a colaboração dos seguintes integrantes:

* Ananda Muxfeldt
* Igor Bastos
* Igor Santana
* Yasmim Bardini

---

## 🎯 Objetivos
* Desenvolver uma aplicação web responsiva para criação e gerenciamento de formulários clínicos.
* Implementar uma API robusta para manipulação e armazenamento seguro dos dados coletados.
* Utilizar contêineres Docker para facilitar o deploy e a escalabilidade do sistema.

---

## 🔄 Modelo de Interação entre Usuário e Sistema
O Diagnosoft foi projetado para proporcionar uma interação fluida e eficiente entre os usuários (profissionais da saúde e pacientes) e o sistema, por meio de uma arquitetura moderna que integra frontend e backend de forma transparente. A seguir, descrevemos as principais ferramentas, frameworks e plataformas que possibilitam essa comunicação:

### 1. Interface do Usuário (Frontend)
* **React**: Biblioteca JavaScript que constrói a interface web dinâmica e responsiva. Permite que os usuários naveguem facilmente pelos formulários, preencham questionários e visualizem resultados em tempo real.
* **Vite**: Ferramenta de build que acelera o carregamento e atualização da interface durante o desenvolvimento, garantindo uma experiência rápida e sem travamentos.
* **ESLint**: Assegura a qualidade e consistência do código da interface, resultando em uma aplicação mais estável para os usuários finais.

### 2. Comunicação com o Servidor (Backend)
* **Express (Node.js)**: Framework que expõe uma API RESTful, responsável por receber as requisições feitas pelo frontend (ex: envio de dados dos formulários, pedidos de cálculo e armazenamento).
* **CORS**: Middleware que garante que o frontend, mesmo estando em uma origem (porta ou domínio) diferente, possa acessar os recursos da API com segurança.
* **dotenv**: Gerencia variáveis sensíveis que configuram endpoints e portas, mantendo a flexibilidade e segurança na comunicação.

### 3. Orquestração e Ambiente de Execução
* **Docker e Docker Compose**: Utilizados para criar ambientes isolados e replicáveis para a API e frontend. Essa configuração garante que a aplicação funcione de maneira consistente em diferentes máquinas, simplificando o processo de instalação e execução pelo usuário.

### 4. Fluxo Básico de Interação
1. **Profissional da saúde** acessa a interface web criada em React para criar ou selecionar um formulário clínico.
2. O formulário é enviado via API para o backend, que armazena as perguntas e configurações.
3. **Paciente** acessa o sistema para preencher o formulário.
4. Os dados preenchidos são enviados para a API, que processa e executa cálculos automáticos quando necessário.
5. O resultado é retornado ao frontend, onde o profissional pode visualizar os diagnósticos e análises.
6. Todos os dados ficam armazenados para consultas futuras, facilitando o acompanhamento clínico.

---

## 🧱 Estrutura do Projeto

```
DIAGNOSOFT_FRONTEND/
├── src/
│ ├── assets/
│ ├── components/
│ ├── pages/
│ ├── Routes/
│ ├── service/
│ ├── App.css
│ ├── App.jsx
│ ├── global.css
│ └── main.jsx
├── .dockerignore
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/) instalados em sua máquina.
Além disso, é necessário estar com a **API rodando localmente**. O repositório da API está disponível em:  
👉 [https://github.com/IgorFBastos/Diagnosoft_API](https://github.com/IgorFBastos/Diagnosoft_API)


### Passos para execução

1. Clone os repositórios:

   ```bash
   git clone https://github.com/IgorFBastos/Diagnosoft_Frontend.git
   ```

2. Copie os arquivos de exemplo de variáveis de ambiente:

   ```bash
   cp Diagnosoft_Frontend/.env.exemple Diagnosoft_Frontend/.env
   ```

3. Inicie os containers com o Docker Compose:

   ```bash
   docker-compose up --build
   ```

4. Acesse a aplicação no seu navegador:

   ```
   http://localhost:5173
   ```

---

## 📌 Funcionalidades
* Criação e gerenciamento de formulários clínicos personalizados.
* Coleta estruturada de dados de pacientes.
* Visualização e análise dos dados coletados.
* Interface de usuário intuitiva e responsiva.

---

## 📊 Diagrama de Casos de Uso
O diagrama abaixo representa os principais atores e funcionalidades do sistema Diagnosoft:

![image](https://github.com/user-attachments/assets/23db65f2-8882-404a-a08f-8a831c68ac2c)


---


