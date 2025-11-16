import "./paraquem.scss";
import '/src/assets/fonts/fonts.scss';

export default function Parte2() {
  return (
    <section className="parte2">
      <div className="onda-topo">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
<path fill="#f6e9e8" d="M0,200 C360,0 900,-130 1440,120 L1440,0 L0,0 Z" />
        </svg>
        
      </div>
        
      <div className="conteudo-paraquem">
        <h2 className="josefin-sans">Para quem é o Conectando Gerações?</h2>

        <div className="text">
          <img
            className="imga"
            src="/images/download (4).jpeg"
            alt="Idosos aprendendo tecnologia"
          />

          <div className="texto">
            <h3 className="josefin-sans">60+</h3>
            <p className="average-sans">
              O Conectando Gerações é um site criado para ajudar idosos a usar a
              internet com mais segurança e confiança. Nossa missão é orientar,
              ensinar e proteger, oferecendo dicas práticas para navegar online,
              evitar golpes e se adaptar às facilidades do mundo digital.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
