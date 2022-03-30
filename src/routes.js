import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Erro from "./pages/Erro";
import Detail from "./pages/Detail";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="app">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="*" element={<Erro />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
