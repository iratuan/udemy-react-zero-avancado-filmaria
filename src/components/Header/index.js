import { Link } from "react-router-dom";

import "./styles.css";

export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        Filmoria
      </Link>
      <Link to="/favorites" className="btn">
        Meus filmes
      </Link>
    </header>
  );
}
