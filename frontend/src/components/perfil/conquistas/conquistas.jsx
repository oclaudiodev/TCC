import { useEffect, useState } from "react"
import {useNavigate} from 'react-router'
import "./conquistas.scss"
import api from "../../../api";
import { toast } from "react-toastify";

export default function Conquistas() {

    const [conquista, setConquistas] = useState([]);
    const navigate = useNavigate();

    async function Cursos() {
        navigate("/cursos")
    }

    useEffect(() => {
        const id_usuario = localStorage.getItem("ID_USUARIO");
        async function PuxarConquistas() {
            try {
                const response = await api.get("/conquistas", {
                    params: { id_usuario }
                })
    console.log("RETORNO DA API:", response.data); 

                setConquistas(response.data);
            }
            catch {
                toast.error("Erro ao carregar conquistas")
            }
        }

        PuxarConquistas();
    }, []);


    return (
        <div className="tudo">

            <div className="conquistas">
                {conquista && conquista.length > 0 ? (
                    conquista.map((item) => (
                        <>
                        <div className="conquistas-container">
                        <div className="conquista" key={item.id_conquista}>
                            <img
                                src={item.img_url}
                                alt={item.titulo_curso}
                                style={{ width: "120px", height: "120px" }}
                                />
                                <div className="barra"></div>
                            <h2 className="josefin-sans">{item.titulo_curso}</h2>
                                </div>
                                </div>
                        </>

                    ))
                ) : (
                    <>
                    <div className="confira-container">
                        <h2 className="josefin-sans">Você não possui nenhuma conquista</h2>
                        <div className="img-conquista">
            <img src="/images/semconquista.png" height={200} />
                        </div>
                    <div className="confira-cursos">
                        <h3 className="josefin-sans">Confira nossos cursos</h3>
                        <button onClick={Cursos} className="bt-cursos average-sans">Páginas Cursos</button>
                    </div>
                    </div>
                    </>

                )}
            </div>
        </div>
    )
}