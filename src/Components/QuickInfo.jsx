import PiletaDeRiego from "../assets/Images/PiletaDeRiego.jpeg";
import Biodiversidad from "../assets/Images/Biodiversidad.jpeg";
import Voluntariado from "../assets/Images/Voluntariado.jpeg";
import VisitasGuiadas from "../assets/Images/VisitasGuiadas.jpeg";

function QuickInfo() {
  const infoItems = [
    {
      title: "Vivero de Nativas",
      text: "Producimos y vendemos plantas nativas. Visitá nuestro catálogo y llevá a casa un pedacito de nuestra flora.",
      image: PiletaDeRiego,

    },
    {
      title: "Biodiversidad",
      text: "Infórmate y hallá recursos sobre la fauna y flora de nuestros ecosistemas pampeanos y serranos.",
  image: Biodiversidad,
    },
    {
      title: "Voluntariado",
      text: "Espacio abierto a la colaboración de la comunidad. ¡Contactanos y sumate a la conservación!",
  image: Voluntariado,
    },
    {
      title: "Visitas Guiadas",
      text: "Recorridos educativos e interpretativos para todas las edades.",
  image: VisitasGuiadas,
    },
  ];

  return (
    <section className="py-20 ">

      {/* Contenido a la derecha */}

      <div className="max-w-6xl mx-auto px-6">{/* Contenedor de titulo y etiquetas Quickinfo */}

        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow-md mb-2">
          <span className="">
            ¿Qué hacemos?
          </span>
        </h1>

        {/* separador decorativo animado */}
        <div className="mt-6 mb-12 flex justify-center">
          <div className="w-24 md:w-28 h-1 bg-gradient-to-r from-emerald-100 via-lime-700 to-emerald-600 rounded-full opacity-100 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> {/* Contenedor de las 4 etiquetas Quickinfo */}
            {infoItems.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col gap-4 bg-white/60 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-2 transform transition duration-300 rounded-lg overflow-hidden border border-emerald-200"
              >
                {/* Imagen de fondo en la parte superior */}
                <div
                  className="w-full h-36 md:h-44 bg-center bg-cover relative"
                  style={{ backgroundImage: `url(${new URL(item.image, import.meta.url).href})` }}
                >
                  {/* overlay para asegurar legibilidad */}
                  <div className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Título sobre la imagen */}
                  <h3 className="relative z-10 flex items-center justify-center gap-3 text-white text-lg md:text-xl font-semibold p-3">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="leading-tight drop-shadow-lg bg-black/65 bg-opacity-60 px-2 py-1 rounded-2xl border border-white/20">{item.title}</span>
                  </h3>
                </div>

                {/* Contenido debajo de la imagen */}
                <div className="p-6">
                  <p className="text-center text-sm text-gray-700 leading-relaxed">{item.text}</p>
                </div>
              </div>

            ))}
          </div>
        </div>
    </section>
  );
}

export default QuickInfo;
