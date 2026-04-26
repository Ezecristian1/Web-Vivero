import React from "react";

function HeroSection() {
    return (
        <section className=" relative bg-cover bg-bottom min-h-screen  py-54  flex items-center justify-center text-cornsilk-500 drop-shadow-[0px_4px_10px_rgba(0,0,0,0.8)]" style={{ backgroundImage: "url('src/assets/Images/Vivero-reciente.jpeg')" }}>
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
        <div className=" z-1 p-8 rounded-xl text-center max-w-2xl  ">
          <h1 className=" text-4xl md:text-5xl font-bold mb-4 drop-shadow-[2px_2px_2px_black]">Reserva Natural Sendero Pampa</h1>
          <p className=" text-lg md:text-xl mb-6 drop-shadow-[2px_2px_2px_black]">Comprometidos a la restauracion, conservación y investigacion de nuestro ecosistema nativo.
</p>
          <button className=" bg-earth-yellow-400  hover:bg-earth-yellow-500 text-co py-2 px-6 rounded-lg text-lg  transition ">Explorá la reserva</button>
        </div>
      </section>

    );
}

export default HeroSection;
