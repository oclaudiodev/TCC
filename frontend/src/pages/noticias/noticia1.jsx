import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Cabecalho from '../../components/cabecalho/cabecalho';
import CabecalhoLogado from '../../components/cabecalhoLogado/cabecalho';
import Rodape from '../../components/rodape/rodape';
import api from '../../api';
import './noticia.scss';

export default function Noticia() {
    const { id } = useParams(); // pega o ID da URL
    const [noticia, setNoticia] = useState(null);
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [logado, setLogado] = useState(null); // 👈 começa como null para evitar piscadas

    async function carregarNoticia() {
        try {
            const response = await api.get(`/noticia/${id}`);
            setNoticia(response.data);
        } catch (error) {
            console.error("Erro ao carregar notícia:", error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("TOKEN");
        const nome_usuario = localStorage.getItem("NOME_USUARIO");

        if (token && nome_usuario) {
            setNomeUsuario(nome_usuario);
            setLogado(true);
        } else {
            setLogado(false);
            setNomeUsuario("");
        }

        carregarNoticia();
        window.scrollTo(0, 0);
    }, [id]);

    // evita renderizar antes de saber se o usuário está logado
    if (logado === null || !noticia) {
        return (
            <div className="noticia">
                <p>Carregando notícia...</p>
            </div>
        );
    }

    return (
        <div className="noticia">
            {logado ? (
                <CabecalhoLogado nome_usuario={nomeUsuario} />
            ) : (
                <Cabecalho />
            )}

            <div className="voltar-noticia">
                <Link to="/tdsntc" onClick={() => window.scrollTo(0, 0)}>
                    <button className="voltar">
                        <img src="/images/setaEsquerda.png" height={25} />
                    </button>
                    <p className='josefin-sans'>Voltar para as notícias</p>
                </Link>
            </div>

            <div className="titulo-noticia">
                <h1 className='josefin-sans'>{noticia.titulo}</h1>
            </div>

            {noticia.subtitulo && <h3 className="subtitulo">{noticia.subtitulo}</h3>}

            <div className="corpo-noticia">
                <div className="fundo-noticia">
                    <img src={noticia.caminho_img1} alt={noticia.titulo} />
                </div>

                <p className='average-sans'>{noticia.conteudo1}</p>
                {noticia.conteudo2 && <p className='average-sans'>{noticia.conteudo2}</p>}
            </div>

            <Rodape />
        </div>
    );
}
