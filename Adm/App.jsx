import './App.css'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Frontpage from './Pages/FrontPage'
import Reserva from './Pages/Reserva'
import Vivero from './Pages/Vivero'
import Novedades from './Pages/Novedades'
import Contacto from './Pages/Contacto'
import AdminLogin from './Pages/AdminLogin'
import AdminPanel from './Pages/AdminPanel'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/inicio" element={<Frontpage />} />
        <Route path="/reserva" element={<Reserva />} />
        <Route path="/vivero" element={<Vivero />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
