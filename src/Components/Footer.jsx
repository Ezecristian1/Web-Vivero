function Footer() {
    return (   
      <footer className="bg-green-800 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h5 className="font-bold mb-2">Reserva Natural UNICEN</h5>
            <p>Universidad Nacional del Centro de la Provincia de Buenos Aires</p>
          </div>
          <div>
            <h5 className="font-bold mb-2">Seguinos</h5>
            <p>
              <a href="https://www.instagram.com/senderopampa/" className="hover:underline">Instagram</a> |{" "}
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-2">Contacto</h5>
            <p>Email: senderopampa@gmail.com</p>
            <p>Teléfono: +54 2494-240309</p>
            <p>Ubicación: <a href="https://maps.app.goo.gl/FpeFKZK8JTtLJLJr5" className="hover:underline">Ver en Google Maps</a></p>
          </div>
        </div>
      </footer>
    );
  }
  
  
export default Footer;