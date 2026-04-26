import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Novedades() {
  return (
    <div>
      <Navbar />
      <section className="min-h-screen py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Novedades</h1>
          <p>Últimas noticias y actividades (placeholder).</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Novedades;
