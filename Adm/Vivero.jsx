import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

function Vivero() {
  const [plantas, setPlantas] = useState([]);

  useEffect(() => {
    const fetchPlantas = async () => {
      try {
        const snapshot = await getDocs(collection(db, "plantas"));
        setPlantas(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error("Error al cargar el catálogo de plantas: ", error);
      }
    };
    fetchPlantas();
  }, []);

  const disponibles = plantas.filter((p) => p.disponible !== false);

  return (
    <div>
      <Navbar />
      <section className="min-h-screen py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-2">Vivero</h1>
          <p className="mb-8 text-gray-600">
            Catálogo de especies nativas disponibles en nuestro vivero.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disponibles.map((p) => (
              <div key={p.id} className="bg-white rounded-lg shadow overflow-hidden">
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt={p.nombreComun}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{p.nombreComun}</h3>
                  {p.nombreCientifico && (
                    <p className="text-sm italic text-gray-500">{p.nombreCientifico}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-2">{p.descripcion}</p>
                </div>
              </div>
            ))}
            {disponibles.length === 0 && (
              <p className="text-gray-500 col-span-full text-center">
                Todavía no hay plantas cargadas en el catálogo.
              </p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Vivero;
