import "./index.scss";
import Cabecalho from "../components/cabecalho/cabecalho";
import Inicio from "../components/paginaPrincipal/Inicio/inicio";
import Paraquem from "../components/paginaPrincipal/Paraquem/paraquem";
import BigNumber from "../components/paginaPrincipal/BigNumber";
import CardCurso2 from "../components/paginaPrincipal/CardCurso2/cardCurso2";
import MVV from "../components/paginaPrincipal/mvv/mvv";
import Depoimentos from "../components/paginaPrincipal/depoimentos/depoimentos";
import AcontecendoAgora from "../components/paginaPrincipal/AcontecendoAgora/AcontecendoAgora";
import Rodape from "../components/rodape/rodape";
import { useEffect, useState } from "react";
import CabecalhoLogado from "../components/cabecalhoLogado/cabecalho";
import Denuncia from "../components/denuncia/denuncia";
import FAQ from '../components/paginaPrincipal/FAQ/faq';
import '/src/assets/fonts/fonts.scss';



export default function Comeco() {

    const [nomeUsuario, setNomeUsuario] = useState("");
    const [logado, setLogado] = useState(false)
    const nome_usuario = localStorage.getItem("NOME_USUARIO")

    useEffect(() => {
        const token = localStorage.getItem("TOKEN");

        if (token != undefined && token != null) {
            setNomeUsuario(nome_usuario)
            setLogado(!!token)
        }
        else{
            setLogado(false)
            setNomeUsuario("")
        }
    })


    return (
        <div className="container-inicio">
            {logado ? (
                <>
                    <CabecalhoLogado
                        nome_usuario = {nomeUsuario}
                    />
                </>
            ) : (
              <>
                <Cabecalho />
              </>  
            )}

            <Inicio />
            <div className="separacao">

            </div>

            <div>
                <Paraquem />
            </div>

            <div>
                <BigNumber />
            </div>

            <div>
                <h1 className="ConhecaCurso josefin-sans ">Conheça Nossos Cursos</h1>
                <CardCurso2 />
            </div>

            <div>
                <MVV />
            </div>

            <div>
                <h1 className="Depoimento josefin-sans ">Depoimentos</h1>
                <Depoimentos />
            </div>

            <div className="barra"></div>

            <div>
                <h1 className="AcontecendoAgora josefin-sans">O que está acontecendo agora?</h1>
                <AcontecendoAgora />
            </div>

          <div className="denuncia">
                <Denuncia />
            </div>
            
    <h1 className="text-faq1 josefin-sans ">Dúvidas Frequentes</h1>
    <p className="text-faq2 average-sans ">Esta seção foi criada para ajudar você a encontrar respostas rápidas para as dúvidas mais comuns. Aqui reunimos informações importantes  <br /> sobre como utilizar o site de forma simples e segura. </p>
<div className="faq">
    <FAQ />
    <div className="Faq-img">
        <img src="/images/faq.png" height={400}/>
    </div>
</div>



            <Rodape />
        </div>
    );
}