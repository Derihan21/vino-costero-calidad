import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Mediciones(){
  const [list, setList] = useState([])
  const [editing, setEditing] = useState(null)
  const [tipos, setTipos] = useState([])
  const empty = {parcela:'',fecha:'',gradosBrix:12.0,variedadId:null,responsable:''}
  const [form, setForm] = useState(empty)

  useEffect(()=>{ fetchList(); fetchTipos() },[])
  function fetchList(){ axios.get('/api/mediciones-brix').then(r=>setList(r.data)).catch(()=>setList([])) }
  function fetchTipos(){ axios.get('/api/tipos-uva').then(r=>setTipos(r.data)).catch(()=>setTipos([])) }

  async function save(e){
    e.preventDefault()
    try{
      // attach variedad object if variedadId
      const payload = {...form}
      if(form.variedadId){ payload.variedad = {id: form.variedadId} }
      delete payload.variedadId
      if(editing){ await axios.put(`/api/mediciones-brix/${editing}`, payload); alert('Medición actualizada') }
      else { await axios.post('/api/mediciones-brix', payload); alert('Medición creada') }
      fetchList(); reset();
    } catch(err){ console.error(err); alert('Error al guardar medición') }
  }

  function editItem(it){ setEditing(it.id); setForm({parcela:it.parcela||'',fecha:it.fecha||'',gradosBrix:it.gradosBrix||12.0,variedadId:it.variedad?it.variedad.id:null,responsable:it.responsable||''}) }
  async function deleteItem(id){ if(!confirm('Confirmar eliminación?')) return; try{ await axios.delete(`/api/mediciones-brix/${id}`); if(editing===id) reset(); fetchList(); alert('Eliminado'); } catch(err){ console.error(err); alert('Error al eliminar') } }
  function reset(){ setEditing(null); setForm(empty) }

  async function cargarEjemplos(){
    try{
      // ensure at least one tipo exists
      if(tipos.length===0){ await axios.post('/api/tipos-uva',{nombre:'Demo',tipo:'tinta',tiempoMaduracion:100}); await fetchTipos() }
      const tipoId = (tipos[0]||{}).id || 1
      const ejemplos = [
        {parcela:'P1',fecha:new Date().toISOString().slice(0,10),gradosBrix:18.5,variedad:{id:tipoId},responsable:'Juan'},
        {parcela:'P2',fecha:new Date().toISOString().slice(0,10),gradosBrix:19.2,variedad:{id:tipoId},responsable:'Maria'}
      ]
      for(const e of ejemplos) await axios.post('/api/mediciones-brix', e)
      fetchList(); alert('Ejemplos cargados')
    } catch(err){ console.error(err); alert('Error cargando ejemplos') }
  }

  return (
    <div style={{display:'flex',gap:20,alignItems:'flex-start',flexWrap:'wrap'}}>
      <div className="card" style={{width:420,minWidth:300}}>
        <h3>{editing? 'Editar medición' : 'Nueva medición'}</h3>
        <form onSubmit={save}>
          <div className="form-row"><input placeholder="Parcela" value={form.parcela} onChange={e=>setForm({...form,parcela:e.target.value})} required /></div>
          <div className="form-row"><input type="date" value={form.fecha} onChange={e=>setForm({...form,fecha:e.target.value})} required /></div>
          <div className="form-row"><input type="number" step="0.1" placeholder="Grados Brix" value={form.gradosBrix} onChange={e=>setForm({...form,gradosBrix:parseFloat(e.target.value||0)})} required style={{width:140}} /></div>
          <div className="form-row">
            <select value={form.variedadId||''} onChange={e=>setForm({...form,variedadId: e.target.value?parseInt(e.target.value):null})}>
              <option value="">-- Seleccionar variedad --</option>
              {tipos.map(t=> <option key={t.id} value={t.id}>{t.nombre} ({t.tipo})</option>)}
            </select>
            <input placeholder="Responsable" value={form.responsable} onChange={e=>setForm({...form,responsable:e.target.value})} />
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
        <table className="table"><thead><tr><th>ID</th><th>Parcela</th><th>Fecha</th><th>Brix</th><th>Variedad</th><th></th></tr></thead>
          <tbody>
            {list.map(i=> (
              <tr key={i.id}><td>{i.id}</td><td>{i.parcela}</td><td>{i.fecha}</td><td>{i.gradosBrix}</td><td>{i.variedad?i.variedad.nombre:'-'}</td>
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
