import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import OrganizationMain from "./pages/OrganizationMain";
import PoliticianMain from "./pages/PoliticianMain";
import Header from "./components/Header";
import Organization from "./pages/Organization";
import Politician from "./pages/Politician";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/organizations/:orgId" element={<Organization />} />
        <Route path="/organizations" element={<OrganizationMain />}/>
        <Route path="/individuals/:indId" element={<Politician />} />
        <Route path="/individuals" element={<PoliticianMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
