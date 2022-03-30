import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

export default function Favorites() {
  const [filmes, setFilmes] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    async function loadFilmes() {
      const favoritosStorage = localStorage.getItem("favoritos");
      let meusFilmesFavoritos = JSON.parse(favoritosStorage) || [];
      setFilmes(meusFilmesFavoritos);
    }

    loadFilmes();
  }, []);

  const remover = (id) => {
    const favoritosStorage = localStorage.getItem("favoritos");
    let meusFilmesFavoritos = JSON.parse(favoritosStorage) || [];
    meusFilmesFavoritos = meusFilmesFavoritos.filter((filme) => {
      return filme.id !== id;
    });

    setFilmes(meusFilmesFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(meusFilmesFavoritos));
  };

  return (
    <div className="container">
      <div className="lista-favoritos">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <h2> {filme.nome} </h2>
              <div className="favoritos-botoes">
                <button onClick={() => navigator(`/detail/${filme.id}`)}>
                  Acessar
                </button>
                <button onClick={() => remover(filme.id)}>Remover</button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
