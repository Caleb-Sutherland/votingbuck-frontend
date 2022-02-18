import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import CorporationMain from "./pages/CorporationMain";
import PoliticianMain from "./pages/PoliticianMain";
import Header from "./components/Header";
import Corporation from "./pages/Corporation";
import Politician from "./pages/Politician";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/corporates/:corpId" element={<Corporation />} />
        <Route path="/corporates" element={<CorporationMain />}/>
        <Route path="/politicians/:poliId" element={<Politician />} />
        <Route path="/politicians" element={<PoliticianMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
