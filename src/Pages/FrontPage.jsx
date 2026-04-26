import React from "react";
import Navbar from "../Components/Navbar";
import HeroSection from "../Components/HeroSection";
import QuickInfo from "../Components/QuickInfo";
import Footer from "../Components/Footer";
import "../index.css";
function Frontpage() {
  return (
    <div className="font-sans text-gray-800 bg-transparent">
      <Navbar />
      {/* Hero Section */}
      <HeroSection />

      {/* Quick Info S
      ection */}
      <QuickInfo />
      
      {/* Optional Biodiversity Map Preview */}
      <section className=" bg-gray-50 py-20  text-center">
        <h2 className=" text-3xl  bg-gray font-bold mb-6">Mapa de Biodiversidad</h2>
        <p className="max-w-xl mx-auto mb-6">Podes encontrarnos acá</p>
        <div className="flex justify-center">
          <iframe
            title="Mapa de biodiversidad UNICEN"
            
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d549.2866433650714!2d-59.08243637289718!3d-37.32408797834226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2sar!4v1760371467701!5m2!1ses!2sar"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl shadow-lg w-full max-w-3xl"
        ></iframe>
        </div>
        <button className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-xl text-lg transition">Ver mapa completo</button>
      </section>

      {/* Noticias o Actividades */}
      <section className="bg-corners-bottom py-20  text-center">
        <h2 className="text-3xl font-bold mb-10">Novedades</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h4 className="font-semibold text-xl mb-2">Reforestación con especies nativas</h4>
            <p>Participá en nuestras jornadas abiertas de plantación.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h4 className="font-semibold text-xl mb-2">Visita de escuelas primarias</h4>
            <p>Educación ambiental para las nuevas generaciones.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h4 className="font-semibold text-xl mb-2">Nueva especie registrada</h4>
            <p>Investigadores identifican una especie rara en la zona serrana.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}







export default Frontpage;
