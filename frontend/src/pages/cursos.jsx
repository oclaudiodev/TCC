import api from '../api.js'
import './cursos.scss'
import CardCurso from '../components/CardCurso/cardCurso.jsx'
import Cabecalho from '../components/cabecalho/cabecalho.jsx'
import Rodape from '../components/rodape/rodape.jsx'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import CabecalhoLogado from '../components/cabecalhoLogado/cabecalho.jsx'
import '/src/assets/fonts/fonts.scss';

export default function Cursos() {

    const [nomeUsuario, setNomeUsuario] = useState("");
    const [logado, setLogado] = useState(false)
    const nome_usuario = localStorage.getItem("NOME_USUARIO");
    const [cursos, setCursos] = useState([]);

    async function listarCursos() {
        const response = await api.get("/puxar/cursos")
        setCursos(response.data);
    }

    useEffect(() => {
        const token = localStorage.getItem("TOKEN");

        if (token != undefined && token != null) {
            setNomeUsuario(nome_usuario)
            setLogado(!!token)
        }
        else {
            setLogado(false)
            setNomeUsuario("")
        }

        listarCursos()
    }, []);



    return (
        <div className='Container-Curso'>

            {logado ? (
                <>
                    <CabecalhoLogado
                        nome_usuario={nomeUsuario}
                    />
                </>
            ) : (
                <>
                    <Cabecalho />
                </>
            )}

            <div className='voltar-cursos'>
                <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
                    <button className='voltar'>
                        <img src="/images/setaEsquerda.png" height={25} />
                    </button>
                    <p className='averare-sans'>Voltar para a página Inicial</p>
                </Link>
            </div>

            <div className='titulo-cursos'>
                <h1 className='josefin-sans'>Cursos</h1>
            </div>



            <div className='cursos'>
                {cursos.map(curso =>
                    <Link key={curso.id_curso} to={curso.url} onClick={() => window.scrollTo(0, 0)}>
                        <div className='container-cardCurso'>
                            <div className='cardCurso'>
                                <img className='imagem' src={curso.caminho_img} alt="" />
                                <div className='titulo-carga'>
                                    <h2 className='titulo josefin-sans'>{curso.nome_curso}</h2>
                                    <div className='tempo'>
                                        <img src="https://img.icons8.com/ios7/200/clock--v3.png" height={20} />
                                        <h2 className='josefin-sans'>{curso.duracao}</h2>
                                    </div>
                                </div>
                                <p className='average-sans'>{curso.descricao}</p>
                                <div className='nivel-button'>
                                    <h2 className='average-sans'>Nível: Básico</h2>
                                    <button className= "josefin-sans">Gratuito</button>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}

            </div>

            <button
                className="botao-topo"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                ⬆
            </button>

            <Rodape />

        </div>
    )
}