import Cabecalho from '../../components/cabecalho/cabecalho';
import Rodape from '../../components/rodape/rodape';
import CardNoticia from '../../components/cardNoticia/cardNoticia';
import './fullnotices.scss';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import CabecalhoLogado from '../../components/cabecalhoLogado/cabecalho';
import api from '../../api';

export default function TodasNoticias() {
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [logado, setLogado] = useState(false);
    const nome_usuario = localStorage.getItem("NOME_USUARIO");
    const [noticias, setNoticias] = useState([]);

  async function listarNoticias() {
         const response = await api.get("/noticias")
         setNoticias(response.data);
     }
 

    useEffect(() => {
        const token = localStorage.getItem("TOKEN");

        if (token) {
            setNomeUsuario(nome_usuario);
            setLogado(true);
        } else {
            setLogado(false);
            setNomeUsuario("");
        }

        listarNoticias();
    }, []);

    return (
        <div className='noticia'>
            {logado ? (
                <CabecalhoLogado nome_usuario={nomeUsuario} />
            ) : (
                <Cabecalho />
            )}

            <div className='voltar-noticia'>
                <Link to={"/"}>
                    <button className='voltar'>
                        <img src="/images/setaEsquerda.png" height={25} />
                    </button>
                    <p className='josefin-sans'>Voltar para a página Inicial</p>
                </Link>
            </div>

            <div className='titulo-noticia'>
                <h1 className='josefin-sans'>Notícias</h1>
            </div>

            <div className='align'>
                <div className='cardsNoticias'>
                    {noticias.map((noticia) => (
                        <Link
                        key={noticia.id_noticias}
                        to={`/noticia/${noticia.id_noticias}`}
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            <div className='cards'>
                                <CardNoticia
                                    imagem={noticia.caminho_img1}
                                    titulo={noticia.titulo}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Rodape />
        </div>
    );
}
