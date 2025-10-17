import React, { useState } from 'react'
import TiposUva from './pages/TiposUva'
import Enfermedades from './pages/Enfermedades'
import Mediciones from './pages/Mediciones'
import EstadoSanitario from './pages/EstadoSanitario'
import Embarques from './pages/Embarques'
import Compradores from './pages/Compradores'
import Login from './pages/Login'
import './styles.css'

export default function App(){
  const [page, setPage] = useState('login')
  const [user, setUser] = useState(null)
  function renderPage(){
    if(!user) return <Login onLogin={u=>{setUser(u); setPage('tipos')}} />
    switch(page){
      case 'enfermedades': return <Enfermedades />
      case 'estado': return <EstadoSanitario />
      case 'mediciones': return <Mediciones />
      case 'embarques': return <Embarques />
      case 'compradores': return <Compradores />
      default: return <TiposUva />
    }
  }

  return (
    <div className="vc-app">
      <header className="vc-header">
        <div className="vc-brand">
          <strong>Vino Costero</strong>
        </div>
        <nav className="vc-nav">
          <button className="vc-link" onClick={()=>setPage('tipos')}>Tipos de Uva</button>
          <button className="vc-link" onClick={()=>setPage('enfermedades')}>Enfermedades</button>
          <button className="vc-link" onClick={()=>setPage('mediciones')}>Mediciones</button>
          <button className="vc-link" onClick={()=>setPage('estado')}>Estado Sanitario</button>
          <button className="vc-link" onClick={()=>setPage('embarques')}>Embarques</button>
          <button className="vc-link" onClick={()=>setPage('compradores')}>Compradores</button>
        </nav>
      </header>

      <main className="vc-main">
        <h1 className="vc-title">Panel de Control - Gestión de Variedades</h1>
        <div className="vc-content">
          {renderPage()}
        </div>
      </main>

      <footer className="vc-footer">© {new Date().getFullYear()} Vino Costero</footer>
    </div>
  )
}
