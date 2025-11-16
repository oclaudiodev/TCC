import "./paginaCurso1.scss";
import Rodape from "../../components/rodape/rodape.jsx";
import Cabecalho from "../../components/cabecalho/cabecalho.jsx";
import CabecalhoLogado from "../../components/cabecalhoLogado/cabecalho.jsx";
import { useEffect, useState } from "react";
import api from "../../api.js";
import { Link, useNavigate } from "react-router-dom";
import Quiz from "../../components/modulosCursos/quiz/index.jsx";
import ModuloCursoLogado from "../../components/modulosCursos/logado/index.jsx";
import BtCurso from "../../components/modulosCursos/BT-Cursos/index.jsx";
import { toast } from "react-toastify";

export default function Curso1() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [logado, setLogado] = useState(false);
  const nome_usuario = localStorage.getItem("NOME_USUARIO");
  const [passarModulo, setPassarModulo] = useState(0);
  const [mostrarConteudo, setMostrarConteudo] = useState(true);
  const [inscritoCurso, setInscritoCurso] = useState(false);
  const navigate = useNavigate();
  const [modulos, setModulos] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [curso, setCurso] = useState({
    nome_curso: "",
    descricao: "",
    duracao: "",
  });
  const id_curso = 7;

  async function verificarConclusao() {
    const id_usuario = localStorage.getItem("ID_USUARIO")
    try {
      const resp = await api.get("/curso/concluido", {
        params: { id_curso, id_usuario },
      });

      console.log("Resposta da API:", resp.data);

      if (resp.data.concluido === true) {
        toast.success("Você já concluiu esse curso!");
        navigate("/cursos");
      }
    } catch (err) {
      console.error("Erro ao verificar conclusão", err);
    }
  }



  async function CursoEspecifico() {
    const response = await api.get("/curso", {
      params: { id_curso }
    })
    setCurso(response.data[0]);
  }

  async function PuxarModulos() {
    const response = await api.get('/cursos/modulos', {
      params: { id_curso }
    })
    setModulos(response.data);
  }

  async function PuxarQuiz() {
    const response = await api.get("/cursos/quiz", {
      params: { id_curso }
    })
    setQuiz(response.data)
  }




  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    const matriculado = localStorage.getItem(`MATRICULADO_${id_curso}`);

    if (matriculado === "true") {
      setInscritoCurso(true);
    }

    if (token != undefined && token != null) {
      setNomeUsuario(nome_usuario)
      setLogado(!!token)
    }
    else {
      setLogado(false)
      setNomeUsuario("")
    }

    if (passarModulo == -1) {
      navigate("/curso1");
      window.location.reload();
    }


    CursoEspecifico();
    PuxarModulos();
    PuxarQuiz();

  }, [])

  async function inscreverCurso() {

    const id_usuario = localStorage.getItem("ID_USUARIO");
    try {
      if (logado) {
        const response = await api.put("/inscrever", {
          id_usuario,
          id_curso
        })
        toast.success("Inscrição realizada com sucesso!");
        setMostrarConteudo(false);
        localStorage.setItem(`MATRICULADO_${id_curso}`, true);
      }
      else {
        toast.warn("Faça login para se inscrever em um curso");
      }
    }
    catch (e) {
      toast.error(e.response?.data?.erro || "Erro ao realizar inscrição")
    }
  }

  async function MatriculadoCurso() {
    const id_usuario = localStorage.getItem("ID_USUARIO");

    const response = await api.get("/curso/concluido", {
      params: { id_curso, id_usuario }
    });

    if (response.data[0]?.concluido === 1) {
      toast.warn("Você já concluiu esse curso!");
      navigate("/cursos");
      return;
    }

    setMostrarConteudo(false);
  }

  function AvancarModulo() {
    setPassarModulo(passarModulo + 1);
  }

  function VoltarModulo() {
    setPassarModulo(passarModulo - 1);
  }

  async function FinalizarCurso() {
    const resultado = localStorage.getItem("RESULTADO_QUIZ");
    const id_usuario = localStorage.getItem("ID_USUARIO");

    if (resultado === "acertou") {
      try {
        await api.put("/concluir", { id_usuario });
        toast.success("Parabéns, você finalizou o curso");
        navigate('/cursos')
      } catch (e) {
        toast.error("Erro ao finalizar curso");
        console.error(e);
      }
    } else {
      toast.warn("Você errou a questão.");
    }
  }


  return (
    <div className="pagina-curso">
      {logado ? (
        <CabecalhoLogado nome_usuario={nomeUsuario} />
      ) : (
        <Cabecalho />
      )}

      <main className="conteudo">
        {mostrarConteudo ? (
          <>
            <div className="lado-esquerdo">
              <h1 className="josefin-sans">{curso.nome_curso}</h1>

              <div className="video-box">
                <iframe
                  src="https://www.youtube.com/embed/spzDz_DpOk8?si=5E2HH9qzbYfIHoY7"
                  title="Curso Eduação Finaceira Digital - Eduação Finaceira Digital"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

                           <p className="descricao">
  {curso.nome_curso?.toLowerCase() === "educação financeira digital"
    ? "Aprenda a lidar com o dinheiro de forma inteligente no ambiente online. Este curso aborda os principais conceitos de finanças digitais, como bancos digitais, carteiras virtuais, investimentos e segurança nas transações. O objetivo é desenvolver hábitos financeiros saudáveis e responsáveis no mundo conectado. "
    : curso.descricao}
</p>

            </div>

            <div className="lado-direito">
              <div className="card-curso">
                <p className="tema average-sans">Segurança Econômica</p>
                <p className="tempo average-sans">{curso.duracao}</p>

                <h2>{curso.nome_curso}</h2>
                <p className="resumo average-sans">
                  Guia básico sobre Educação Digital, seus benifícios e como evitar golpes 
                </p>

                <p className="nivel average-sans">Nível: Básico</p>

                <div className="gratuito">Gratuito</div>

                <div className="inclui">
                  <h3 className="josefin-sans">Esse curso inclui:</h3>
                  <ul>
                    <li className="josefin-sans">⭐ Módulos</li>
                    <li className="josefin-sans">⭐ Vídeo</li>
                    <li className="josefin-sans">⭐ Quiz</li>
                  </ul>
                </div>

                <div className="avaliacao">
                  <h3 className="josefin-sans">5 de 5 ⭐⭐⭐⭐⭐</h3>
                  <p className="average-sans">Avaliação</p>
                </div>

                {inscritoCurso ? (
                  <BtCurso
                    titulo={"ACESSAR CURSO"}
                    onClick={() => {
                      MatriculadoCurso();
                      verificarConclusao();
                    }}
                  />
                ) : (
                  <BtCurso
                    titulo={"INSCREVA-SE"}
                    onClick={inscreverCurso}
                  />
                )}

              </div>
            </div>
          </>


        ) : (
          <div>
            {logado ? (
              <>
              <div className='voltar-cursos'>
                  <Link to={"/cursos"} onClick={() => window.scrollTo(0, 0)}>
                    <button className='voltarReg'>
                      <img src="/images/setaEsquerda.png" height={25} />
                    </button>
                    <p className="average-sans">Voltar para a página de Cursos</p>
                  </Link>
                </div>
                {passarModulo < modulos.length && (
                  <>
                    <ModuloCursoLogado
                      titulo={modulos[passarModulo]?.titulo}
                      conteudo={modulos[passarModulo]?.conteudo}
                    />

                    <div className="botoes">
                      {passarModulo > 0 && (
                        <button onClick={VoltarModulo}>Voltar</button>
                      )}
                      <button onClick={AvancarModulo}>Próximo</button>
                    </div>
                  </>
                )}


                {passarModulo === modulos.length && (
                  <>
                    <Quiz
                      pergunta={quiz[0]?.pergunta}
                      opcaoA={quiz[0]?.alternativa1}
                      opcaoB={quiz[0]?.alternativa2}
                      opcaoC={quiz[0]?.alternativa3}
                      opcaoD={quiz[0]?.alternativa4}
                      resposta={quiz[0]?.resposta}
                    />

                    <div className="botoes">
                      <button className="josefin-sans" onClick={VoltarModulo}>Voltar</button>
                      <button className="josefin-sans" onClick={FinalizarCurso}>Finalizar Curso</button>
                    </div>
                  </>
                )}
              </>
            ) : null}
          </div>


        )}

      </main>

      <Rodape />
    </div>
  );
}
