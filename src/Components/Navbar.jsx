import { useState , useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  // Estado para rastrear si la página ha sido desplazada
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();
  const isFrontPage = location.pathname === "/" || location.pathname === "/inicio";

  // Si estamos en FrontPage, el color depende de isScrolled; en otra página siempre text-gray-800
  const linkColor = isFrontPage ? (isScrolled ? "text-gray-800" : "text-white") : "text-gray-800";

  return (

  <nav className={` shadow-md  top-0 py-3 z-50 w-full transition-all duration-400 
                   ${ isFrontPage ?  (isScrolled ? "fixed bg-gray-100/90 backdrop-blur-md shadow-md" :  "fixed bg-white/10 backdrop-blur-sm") : 
                       "sticky bg-gray-100/90 backdrop-blur-md shadow-md"}`}
                    >

    <div className="w-full px-4 py-2 flex flex-col md:flex-row md:items-center md:justify-between">
      
      {/* Título con logo alineado horizontalmente */}
      <Link to="/" className="flex items-center space-x-4">
        
        <img 
          src="src/assets/Images/Logos Reserva-vivero/LOGO 1 new.png" 
          alt="Logo de Reserva UNICEN" 
          
          className="h-10 w-auto max-h-10 shadow-md rounded-full border border-green-300 transition-transform duration-300 hover:scale-105" // <- altura controlada
        />
        <span className="text-dark-moss-green-500 font-extrabold text-xl pt-3 pr-4 ">Sendero Pampa</span>
      </Link>

      {/* Links centrados horizontalmente en pantallas grandes */}
      <ul className="hidden md:flex justify-center space-x-8 mt-2 md:mt-0 text-lg font-heavy">
        <li><Link to="/" className={`transition ${linkColor} hover:text-pakistan-green-700`}>Inicio</Link></li>
        <li>
          <Link to="/reserva" className={`transition ${linkColor} hover:text-pakistan-green-700`}>Reserva</Link>
          <ul className="absolute hidden group-hover:block bg-white shadow-lg rounded mt-2">
              <li><Link to="/reserva/actividades" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition">Actividades</Link></li>
              <li><Link to="/reserva/servicios" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition">Servicios</Link></li>
              <li><Link to="/reserva/ubicacion" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition">Ubicación</Link></li>
          </ul>

        </li>

        <li><Link to="/vivero" className={`transition ${linkColor} hover:text-pakistan-green-700`}>Vivero</Link></li>

        <li><Link to="/novedades" className={`transition ${linkColor} hover:text-pakistan-green-700`}>Novedades</Link></li>
        <li><Link to="/contacto" className={`transition ${linkColor} hover:text-pakistan-green-700`}>Contacto</Link></li>
      </ul>


    </div>
  </nav>


    );
}

export default Navbar;
