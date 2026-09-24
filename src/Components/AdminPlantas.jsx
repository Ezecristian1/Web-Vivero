import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const emptyForm = {
  nombreComun: "",
  nombreCientifico: "",
  descripcion: "",
  categoria: "",
  imageUrl: "",
  disponible: true,
};

function AdminPlantas() {
  const [plantas, setPlantas] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const cargarPlantas = async () => {
    const snapshot = await getDocs(collection(db, "plantas"));
    setPlantas(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    cargarPlantas();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, "plantas", editingId), form);
      } else {
        await addDoc(collection(db, "plantas"), form);
      }
      setForm(emptyForm);
      setEditingId(null);
      await cargarPlantas();
    } catch (err) {
      console.error("Error al guardar planta:", err);
      alert("Ocurrió un error al guardar la planta.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (planta) => {
    setForm({
      nombreComun: planta.nombreComun || "",
      nombreCientifico: planta.nombreCientifico || "",
      descripcion: planta.descripcion || "",
      categoria: planta.categoria || "",
      imageUrl: planta.imageUrl || "",
      disponible: planta.disponible ?? true,
    });
    setEditingId(planta.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta planta del catálogo?")) return;
    await deleteDoc(doc(db, "plantas", id));
    await cargarPlantas();
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <h2 className="md:col-span-2 text-xl font-semibold">
          {editingId ? "Editar planta" : "Nueva planta"}
        </h2>

        <label className="flex flex-col text-sm">
          Nombre común
          <input
            name="nombreComun"
            value={form.nombreComun}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </label>

        <label className="flex flex-col text-sm">
          Nombre científico
          <input
            name="nombreCientifico"
            value={form.nombreCientifico}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </label>

        <label className="flex flex-col text-sm md:col-span-2">
          Descripción
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows={3}
            className="border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </label>

        <label className="flex flex-col text-sm">
          Categoría (árbol, arbusto, herbácea, etc.)
          <input
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </label>

        <label className="flex flex-col text-sm">
          URL de imagen
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </label>

        <label className="flex items-center gap-2 text-sm md:col-span-2">
          <input
            type="checkbox"
            name="disponible"
            checked={form.disponible}
            onChange={handleChange}
          />
          Disponible en el vivero
        </label>

        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-dark-moss-green-500 hover:bg-dark-moss-green-400 text-white px-5 py-2 rounded transition disabled:opacity-50"
          >
            {editingId ? "Guardar cambios" : "Agregar planta"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plantas.map((p) => (
          <div key={p.id} className="bg-white rounded-lg shadow p-4">
            {p.imageUrl && (
              <img
                src={p.imageUrl}
                alt={p.nombreComun}
                className="w-full h-32 object-cover rounded mb-3"
              />
            )}
            <h3 className="font-semibold text-lg">{p.nombreComun}</h3>
            {p.nombreCientifico && (
              <p className="text-sm italic text-gray-500">{p.nombreCientifico}</p>
            )}
            <p className="text-sm text-gray-600 mb-1 line-clamp-3">{p.descripcion}</p>
            <p className="text-xs text-gray-500 mb-3">
              {p.categoria && `${p.categoria} · `}
              {p.disponible ? "Disponible" : "No disponible"}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(p)}
                className="text-sm text-blue-600 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {plantas.length === 0 && (
          <p className="text-gray-500">No hay plantas cargadas todavía.</p>
        )}
      </div>
    </div>
  );
}

export default AdminPlantas;
