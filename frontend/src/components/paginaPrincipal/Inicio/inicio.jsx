import "./inicio.scss"
import '/src/assets/fonts/fonts.scss'
import {Link} from 'react-router'
import '/src/assets/fonts/fonts.scss';


export default function Inicio() {
    return (
        <div>
            <div className="tudo">
                <div className="td">

                    <div className="tt">
                        <h1 className="titulo josefin-sans">Aprenda a navegar de forma Segura na Internet</h1>
                    </div>
                    <div className="txt">
                        <h3 className="average-sans ">O Conectando Gerações foi criado para ajudar pessoas idosas a explorarem o mundo digital com mais confiança e segurança. Aqui, você encontra cursos que ensinam como se proteger de golpes online. Além disso, disponibilizamos notícias atualizadas e um canal de denúncias onde iremos auxiliar com qualquer problema.</h3>
                    </div>
                    <div className="txtxt">
                        <h3 className="josefin-sans ">AQUI VOCÊ ENCONTRA:</h3>
                        <h3 className="average-sans "> <img className="imgage" src="/images/setaEsquerda.png"></img> Cursos</h3>
                        <h3 className="average-sans "> <img className="imgage" src="/images/setaEsquerda.png"></img> Notícias</h3>
                        <h3 className="average-sans "> <img className="imgage" src="/images/setaEsquerda.png"></img> Conhecimento</h3>
                    </div>
                    <div>
                        <Link to ={'/quemsomos'} onClick={() => window.scrollTo(0, 0)}>
                            <button className="bt josefin-sans">Saiba mais sobre nós</button>
                        </Link>
                        
                    </div>
                </div>
                <div className="tudo-img">
                    <img className="img" src="/images/senhora.png" />
                </div>
            </div>
        </div>
    )
}