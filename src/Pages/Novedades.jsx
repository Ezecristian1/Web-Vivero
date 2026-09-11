import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Novedad from "../Components/Novedad";
import novedad_prueba from "../assets/Images/novedad_prueba.jpg";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Novedades() {
  const [novedades, setNovedades] = useState([]);

  // Cargar novedades desde Firestore
  useEffect(() => {
    const fetchNovedades = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "novedades"));
        const novedadesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNovedades(novedadesData);
      } catch (error) {
        console.error("Error al cargar novedades: ", error);
      }
    };

    fetchNovedades();
  }, []);

  // Agregar una novedad de prueba
  const agregarNovedadPrueba = async () => {
    try {
      await addDoc(collection(db, "novedades"), {
        title: "Nueva especie registrada",
        description:
          "Investigadores identifican una especie rara en la zona serrana.",
        imageUrl: novedad_prueba,
        date: "2026-05-03",
        link: "https://www.ejemplo.com/novedad",
      });
      alert("Novedad de prueba agregada");
    } catch (error) {
      console.error("Error al agregar novedad de prueba: ", error);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="min-h-screen py-20 bg-gray-300">
        <div className="max-w-6xl mx-auto p-6 bg-blue-100 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Novedades</h1>
          <p className="mb-6">Últimas noticias y actividades.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {novedades.map((item) => (
              <Novedad
                key={item.id}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                date={item.date}
                link={item.link}
              />
            ))}
          </div>
          <button
            onClick={agregarNovedadPrueba}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Agregar novedad de prueba
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
