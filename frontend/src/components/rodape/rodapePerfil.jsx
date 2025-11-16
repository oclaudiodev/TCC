import "./rodape.scss";
import { Link } from 'react-router'
import '/src/assets/fonts/fonts.scss';


export default function Rodape2() {
  return (
    <footer className="rodape">
      <div className="onda-linha">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" width="100%" height="80">
          <path
            d="M0,90 C460,600 700,-100 1440,20"
            fill="none"
            stroke="#F3E7E7"     // cor da linha
            strokeWidth="11"       // espessura
          />
        </svg>
      </div>

      <div className="rodape-conteudo">
        <div className="colun">
          <div className="coluna logo">
            <img src="/images/logoVeio.png" />
            <h3 className="josefin-sans">CONECTANDO GERAÇÕES</h3>
            <p className="average-sans">tobugadoanalise@gmail.com</p>
          </div>
        </div>

        <div className="coluna">
          <h4 className="average-sans">Links</h4>
          <ul>
            <li className="josefin-sans"><Link className="link" to='/cursos' onClick={() => window.scrollTo(0, 0)}>Cursos</Link></li>
            <li className="josefin-sans"><Link className="link" to='/tdsntc' onClick={() => window.scrollTo(0, 0)}>Notícias</Link></li>
            <li className="josefin-sans">Quem Somos</li>
          </ul>
        </div>

        <div className="coluna">
          <h4 className="average-sans">Social</h4>
          <ul>
            <li className="josefin-sans">Facebook</li>
            <li className="josefin-sans">Whatsapp</li>
            <li className="josefin-sans">Instagram</li>
          </ul>
        </div>

        <div className="coluna">
          <h4 className="average-sans">Legal</h4>
          <ul>
            <li className="josefin-sans">Termos de uso</li>
            <li className="josefin-sans">Privacidade</li>
            <li className="josefin-sans">Cookies</li>
          </ul>
        </div>
      </div>

      <div className="rodape-final">
        <p></p>
        <p className="average-sans">© 2025 Todos os direitos reservados para Conectando Gerações</p>
        <Link to={'/loginadm'}>
          <pre className="average-sans">Login Adm</pre>
        </Link>
      </div>
    </footer>
  );
}
