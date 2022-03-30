import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

import { FaThumbtack, FaYoutube } from "react-icons/fa";

import "./styles.css";

export default function Film() {
  const { id } = useParams();
  const [filme, setFilme] = useState([]);
  const navigator = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilm() {
      const response = await api.get(`/r-api/?api=filmes/${id}`);
      if (!response.data.id) {
        navigator("/");
        return;
      }
      setFilme(response.data);
    }

    loadFilm();
    setLoading(false);

    return () => console.log("componente desmontado");
  }, [id, navigator]);

  const favoritar = (favorito) => {
    const favoritosStorage = localStorage.getItem("favoritos");
    let meusFilmesFavoritos = JSON.parse(favoritosStorage) || [];

    let filmeJaSalvo = meusFilmesFavoritos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id
    );

    if (!filmeJaSalvo) {
      console.log("salvando o filme no local storage");
      meusFilmesFavoritos.push(favorito);
      localStorage.setItem("favoritos", JSON.stringify(meusFilmesFavoritos));
    }
  };

  const asssistirTrailer = () => {
    window.open(
      `https://www.youtube.com/results?search_query=${filme.nome}`,
      "_blank"
    );
  };

  return (
    <div className="container">
      {loading && <div className="loading">Carregando</div>}
      <div className="detalhe-filme">
        <article key={filme.id}>
          <h2> {filme.nome} </h2>
          <div className="detalhe">
            <img src={filme.foto} alt={filme.nome} />
            <div className="resumo">
              {filme.sinopse}
              <ul className="acoes">
                <li>
                  <button onClick={() => asssistirTrailer()}>
                    <FaYoutube />
                    Assistir trailer
                  </button>
                </li>
                <li>
                  <button onClick={() => favoritar(filme)}>
                    <FaThumbtack />
                    Favoritar
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
