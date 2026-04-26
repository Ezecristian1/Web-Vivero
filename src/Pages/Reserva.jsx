import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../index.css";

function Reserva() {
    return (
        <div className="">
            <Navbar />
            {/* Contenido de la página de reserva */}
            <section className="bg-corners min-h-screen   ">
            <div className="grid grid-cols-[1fr,2fr] ">
                <div className="col-1" ><img className="contain" src="src/assets/Images/cartel-vivero.jpg" alt="Cartel de Bienvenida al Sendero" /></div>
                
                <h1 className="col-2">Reserva Natural Sendero Pampa</h1>
                
            </div>
            </section>
            <Footer />
      </div>

    );
}

export default Reserva;