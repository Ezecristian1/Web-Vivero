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
  title: "",
  description: "",
  imageUrl: "",
  date: "",
  link: "",
};

function AdminNovedades() {
  const [novedades, setNovedades] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const cargarNovedades = async () => {
    const snapshot = await getDocs(collection(db, "novedades"));
    setNovedades(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    cargarNovedades();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, "novedades", editingId), form);
      } else {
        await addDoc(collection(db, "novedades"), form);
      }
      setForm(emptyForm);
      setEditingId(null);
      await cargarNovedades();
    } catch (err) {
      console.error("Error al guardar novedad:", err);
      alert("Ocurrió un error al guardar la novedad.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (novedad) => {
    setForm({
      title: novedad.title || "",
      description: novedad.description || "",
      imageUrl: novedad.imageUrl || "",
      date: novedad.date || "",
      link: novedad.link || "",
    });
    setEditingId(novedad.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta novedad?")) return;
    await deleteDoc(doc(db, "novedades", id));
    await cargarNovedades();
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
          {editingId ? "Editar novedad" : "Nueva novedad"}
        </h2>

        <label className="flex flex-col text-sm">
          Título
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </label>

        <label className="flex flex-col text-sm">
          Fecha
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </label>

        <label className="flex flex-col text-sm md:col-span-2">
          Descripción
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
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

        <label className="flex flex-col text-sm">
          Link (opcional)
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="https://..."
            className="border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </label>

        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-dark-moss-green-500 hover:bg-dark-moss-green-400 text-white px-5 py-2 rounded transition disabled:opacity-50"
          >
            {editingId ? "Guardar cambios" : "Agregar novedad"}
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
        {novedades.map((n) => (
          <div key={n.id} className="bg-white rounded-lg shadow p-4">
            {n.imageUrl && (
              <img
                src={n.imageUrl}
                alt={n.title}
                className="w-full h-32 object-cover rounded mb-3"
              />
            )}
            <h3 className="font-semibold text-lg">{n.title}</h3>
            <p className="text-sm text-gray-500">{n.date}</p>
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">{n.description}</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(n)}
                className="text-sm text-blue-600 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(n.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {novedades.length === 0 && (
          <p className="text-gray-500">No hay novedades cargadas todavía.</p>
        )}
      </div>
    </div>
  );
}

export default AdminNovedades;
