import React from "react";

import Footer from "../components/Footer";
import { Header } from "../components/Header";
import { FaSpinner } from "react-icons/fa";

export default function LoadingScreen() {
  return (
    <div>
      <Header />
      <div className="h-screen flex justify-center content-center items-center justify-items-center">
        <FaSpinner
          size={50}
          className="animate-spin"
        />
      </div>
      <Footer />
    </div>
  );
}
