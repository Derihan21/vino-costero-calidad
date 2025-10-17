import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Enfermedades(){
  const [list, setList] = useState([])
  const [editing, setEditing] = useState(null)
  const empty = {nombre:'',sintomas:'',agenteCausante:'',tratamientoRecomendado:'',nivelRiesgo:'bajo',fotoPath:''}
  const [form, setForm] = useState(empty)

  useEffect(()=>{ fetchList() },[])
  function fetchList(){ axios.get('/api/enfermedades').then(r=>setList(r.data)).catch(()=>setList([])) }

  async function save(e){
    e.preventDefault()
    try{
      if(editing){
        await axios.put(`/api/enfermedades/${editing}`, form)
        alert('Enfermedad actualizada')
      } else {
        await axios.post('/api/enfermedades', form)
        alert('Enfermedad creada')
      }
      fetchList(); reset()
    } catch(err){ console.error(err); alert('Error al guardar. Revisa consola.') }
  }

  function editItem(it){ setEditing(it.id); setForm({nombre:it.nombre||'',sintomas:it.sintomas||'',agenteCausante:it.agenteCausante||'',tratamientoRecomendado:it.tratamientoRecomendado||'',nivelRiesgo:it.nivelRiesgo||'bajo',fotoPath:it.fotoPath||''}) }
  async function deleteItem(id){ if(!confirm('Confirmar eliminación?')) return; try{ await axios.delete(`/api/enfermedades/${id}`); if(editing===id) reset(); fetchList(); alert('Eliminado'); } catch(err){ console.error(err); alert('Error al eliminar') } }
  function reset(){ setEditing(null); setForm(empty) }

  // ejemplo rápido desde frontend
  async function cargarEjemplos(){
    const ejemplos = [
      {nombre:'Mildiu', sintomas:'Manchas aceitunadas en hojas; pelusa blanca en envés', agenteCausante:'Plasmopara viticola', tratamientoRecomendado:'Fungicidas y manejo de humedad', nivelRiesgo:'alto'},
      {nombre:'Botritis', sintomas:'Podredumbre gris en racimos', agenteCausante:'Botrytis cinerea', tratamientoRecomendado:'Buenas prácticas de poda y fungicidas', nivelRiesgo:'medio'},
      {nombre:'Oídio', sintomas:'Polvo blanco en brotes y hojas', agenteCausante:'Erysiphe necator', tratamientoRecomendado:'Fungicidas y control de sombra', nivelRiesgo:'medio'}
    ]
    try{
      for(const e of ejemplos) await axios.post('/api/enfermedades', e)
      fetchList(); alert('Ejemplos cargados')
    } catch(err){ console.error(err); alert('Error cargando ejemplos') }
  }

  return (
    <div style={{display:'flex',gap:20,alignItems:'flex-start',flexWrap:'wrap'}}>
      <div className="card" style={{width:420,minWidth:300}}>
        <h3>{editing? 'Editar enfermedad' : 'Nueva enfermedad'}</h3>
        <form onSubmit={save}>
          <div className="form-row"><input placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} required /></div>
          <div className="form-row"><textarea placeholder="Síntomas" value={form.sintomas} onChange={e=>setForm({...form,sintomas:e.target.value})} rows={3} /></div>
          <div className="form-row"><textarea placeholder="Agente causante" value={form.agenteCausante} onChange={e=>setForm({...form,agenteCausante:e.target.value})} rows={2} /></div>
          <div className="form-row"><textarea placeholder="Tratamiento recomendado" value={form.tratamientoRecomendado} onChange={e=>setForm({...form,tratamientoRecomendado:e.target.value})} rows={2} /></div>
          <div className="form-row">
            <select value={form.nivelRiesgo} onChange={e=>setForm({...form,nivelRiesgo:e.target.value})}>
              <option value="bajo">Bajo</option>
              <option value="medio">Medio</option>
              <option value="alto">Alto</option>
              <option value="critico">Crítico</option>
            </select>
            <input placeholder="Ruta foto (opcional)" value={form.fotoPath} onChange={e=>setForm({...form,fotoPath:e.target.value})} />
          </div>
          <div style={{display:'flex',gap:8}}>
            <button type="submit">{editing? 'Actualizar' : 'Crear'}</button>
            <button type="button" className="secondary" onClick={reset}>Limpiar</button>
            <button type="button" className="secondary" onClick={cargarEjemplos}>Cargar ejemplos</button>
          </div>
        </form>
      </div>

      <div className="card" style={{overflowX:'auto'}}>
        <h3>Listado</h3>
        <table className="table"><thead><tr><th>ID</th><th>Nombre</th><th>Nivel</th><th>Fotos</th><th></th></tr></thead>
          <tbody>
            {list.map(i=> (
              <tr key={i.id}><td>{i.id}</td><td style={{maxWidth:300}}>{i.nombre}</td><td>{i.nivelRiesgo}</td><td>{i.fotoPath||'-'}</td>
                <td style={{textAlign:'right'}}>
                  <button type="button" className="secondary" onClick={()=>editItem(i)} style={{marginRight:8}}>Editar</button>
                  <button type="button" onClick={()=>deleteItem(i.id)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
