import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import CorporationMain from "./pages/CorporationMain";
import PoliticianMain from "./pages/PoliticianMain";
import UniversityMain from "./pages/UniversityMain";
import Header from "./components/Header";
import Corporation from "./pages/Corporation";
import Politician from "./pages/Politician";
import University from "./pages/University";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/corporations/:corpId" element={<Corporation />} />
        <Route path="/corporations" element={<CorporationMain />}/>
        <Route path="/politicians/:poliId" element={<Politician />} />
        <Route path="/politicians" element={<PoliticianMain />} />
        <Route path="/universities/:uniId" element={<University />} />
        <Route path="/universities" element={<UniversityMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
