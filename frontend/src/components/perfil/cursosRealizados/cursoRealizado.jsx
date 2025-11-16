import "./cursoRealizado.scss";
import { useEffect, useState } from "react";
import api from "../../../api.js";
import { toast } from "react-toastify";
import { Link } from 'react-router'

export default function Realizado() {
  const [conquista, setConquista] = useState([]);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {

    const id_usuario = localStorage.getItem("ID_USUARIO");
    async function PuxarDados() {
      try {
        const response = await api.get("/conquistas", {
          params: { id_usuario }
        })
        setConquista(response.data);

        const respCursos = await api.get("/puxar/cursos3");
        setCursos(respCursos.data);
      } catch (err) {
        console.error(err);
        toast.error("Erro ao carregar informações");
      }
    }

    PuxarDados();
  }, []); // <- importante: array de dependências para rodar só 1 vez

  return (
    <div className="container-tudo">

      {conquista && conquista.length > 0 ? (
        <div className="realizados">
          {conquista.map((item) => (
            <div className="realizado" key={item.id_conquista}>
              <img
                src={item.img_url}
                style={{ width: "120px", height: "120px" }}
              />
              <div className="tt">
                <h2 className="josefin-sans">{item.titulo_curso}</h2>
                <h3 className="josefin-sans">Concluido</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="sem-cursos">
          <h3 className="josefin-sans">Você ainda não concluiu nenhum curso</h3>
          <p className="average-sans">Veja as recomendações ao lado e comece um curso!</p>
          <img src="/images/semconquista.png" height={200} />

        </div>
      )}

      <div className="recomenda-tudo">
        {cursos && cursos.length > 0 ? (
          cursos.map((item) => (
            <div className="recomendacao" key={item.id_curso}>
              <div className="texto">
                <h3 className="titulo-recomendacao">{item.nome_curso}</h3>
                <p className="average-sans">{item.descricao}</p>
                <Link to={item.url}>
                  <button className="averages-sans" >Ver Curso</button>
                </Link>

              </div>
              <img src={item.caminho_img} alt={item.nome_curso} />
            </div>
          ))
        ) : (
          <p className="average-sans">Carregando recomendações...</p>
        )}
      </div>

    </div>
  );
}
