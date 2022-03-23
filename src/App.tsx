import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import OrganizationMain from "./pages/OrganizationMain";
import IndividualMain from "./pages/IndividualMain";
import Header from "./components/Header";
import Organization from "./pages/Organization";
import Individual from "./pages/Individual";

function App() {

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/organizations/:orgId" element={<Organization />} />
        <Route path="/organizations" element={<OrganizationMain />}/>
        <Route path="/individuals/:indId" element={<Individual />} />
        <Route path="/individuals" element={<IndividualMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
