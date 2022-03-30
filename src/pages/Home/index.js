import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";

export default function Index() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("/r-api/?api=filmes");
      setFilmes(response.data);
    }

    loadFilmes();
  }, []);

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <h2> {filme.nome} </h2>
              <img src={filme.foto} alt={filme.nome} />
              <div className="resumo">{filme.sinopse}</div>
              <Link to={`/detail/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
