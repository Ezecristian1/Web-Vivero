import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AdminNovedades from "../Components/AdminNovedades";
import AdminPlantas from "../Components/AdminPlantas";

function AdminPanel() {
  const [tab, setTab] = useState("novedades");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-dark-moss-green-500 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Panel de administrador</h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded transition"
        >
          Cerrar sesión
        </button>
      </header>

      <nav className="bg-white shadow px-6 flex gap-6">
        <button
          onClick={() => setTab("novedades")}
          className={`py-3 border-b-2 transition ${
            tab === "novedades"
              ? "border-dark-moss-green-500 text-dark-moss-green-500 font-semibold"
              : "border-transparent text-gray-500"
          }`}
        >
          Novedades
        </button>
        <button
          onClick={() => setTab("plantas")}
          className={`py-3 border-b-2 transition ${
            tab === "plantas"
              ? "border-dark-moss-green-500 text-dark-moss-green-500 font-semibold"
              : "border-transparent text-gray-500"
          }`}
        >
          Catálogo de plantas
        </button>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        {tab === "novedades" ? <AdminNovedades /> : <AdminPlantas />}
      </main>
    </div>
  );
}

export default AdminPanel;
