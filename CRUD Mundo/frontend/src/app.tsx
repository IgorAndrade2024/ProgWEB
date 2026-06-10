import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./componentes/navbar";
import PrivateRoute from "./componentes/PrivateRoute";

import Login from "./paginas/login";
import Continentes from "./paginas/continente";
import Paises from "./paginas/paises";
import Cidades from "./paginas/cidades";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/continentes"
          element={
            <PrivateRoute>
              <Continentes />
            </PrivateRoute>
          }
        />

        <Route
          path="/paises"
          element={
            <PrivateRoute>
              <Paises />
            </PrivateRoute>
          }
        />

        <Route
          path="/cidades"
          element={
            <PrivateRoute>
              <Cidades />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;