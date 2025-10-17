import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function TiposUva(){
  const [list, setList] = useState([])
  const [form, setForm] = useState({nombre:'',tipo:'blanca',tiempoMaduracion:120,caracteristicas:''})
  const [editing, setEditing] = useState(null)

  useEffect(()=>{ fetchList() },[])
  function fetchList(){ axios.get('/api/tipos-uva').then(r=>setList(r.data)).catch(()=>setList([])) }

  async function save(e){
    e.preventDefault()
    try{
      if(editing){
        await axios.put(`/api/tipos-uva/${editing}`, form)
        alert('Tipo de uva actualizado correctamente')
      } else {
        await axios.post('/api/tipos-uva', form)
        alert('Tipo de uva creado correctamente')
      }
      fetchList(); reset()
    } catch(err){
      console.error('Error guardando:', err)
      alert('Ocurrió un error al guardar. Revisa la consola.')
    }
  }

  function editItem(item){ setEditing(item.id); setForm({nombre:item.nombre,tipo:item.tipo,tiempoMaduracion:item.tiempoMaduracion,caracteristicas:item.caracteristicas||''}) }
  async function deleteItem(id){
    if(!confirm('Confirmar eliminación?')) return;
    try{
      await axios.delete(`/api/tipos-uva/${id}`)
      alert('Eliminado correctamente')
      // if we were editing the same item, reset form
      if(editing === id) reset()
      fetchList()
    } catch(err){
      console.error('Error eliminando:', err)
      alert('Ocurrió un error al eliminar. Revisa la consola.')
    }
  }
  function reset(){ setEditing(null); setForm({nombre:'',tipo:'blanca',tiempoMaduracion:120,caracteristicas:''}) }

  return (
    <div style={{display:'flex',gap:20,alignItems:'flex-start',flexWrap:'wrap'}}>
      <div className="card" style={{width:360,minWidth:280}}>
        <h3>{editing? 'Editar Tipo de Uva' : 'Nuevo Tipo de Uva'}</h3>
        <form onSubmit={save}>
          <div className="form-row" style={{marginBottom:8}}>
            <label style={{display:'none'}} htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} required />

            <label style={{display:'none'}} htmlFor="tipo">Tipo</label>
            <select id="tipo" name="tipo" value={form.tipo} onChange={e=>setForm({...form,tipo:e.target.value})}>
              <option value="blanca">Blanca</option>
              <option value="tinta">Tinta</option>
            </select>
          </div>
          <div className="form-row" style={{marginBottom:8}}>
            <label style={{display:'none'}} htmlFor="tiempoMaduracion">Tiempo maduración</label>
            <input id="tiempoMaduracion" name="tiempoMaduracion" type="number" value={form.tiempoMaduracion} onChange={e=>setForm({...form,tiempoMaduracion:parseInt(e.target.value||0)})} style={{width:140}} required />

            <label style={{display:'none'}} htmlFor="caracteristicas">Características</label>
            <textarea id="caracteristicas" name="caracteristicas" placeholder="Características" value={form.caracteristicas} onChange={e=>setForm({...form,caracteristicas:e.target.value})} rows={3} />
          </div>
          <div style={{display:'flex',gap:8}}>
            <button type="submit">{editing? 'Actualizar' : 'Crear'}</button>
            <button type="button" className="secondary" onClick={reset}>Limpiar</button>
          </div>
        </form>
      </div>

  <div className="card" style={{overflowX:'auto'}}>
        <h3>Listado</h3>
        <table className="table">
          <thead><tr><th>ID</th><th>Nombre</th><th>Tipo</th><th>Maduración</th><th></th></tr></thead>
          <tbody>
            {list.map(t=> (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.nombre}</td>
                <td>{t.tipo}</td>
                <td>{t.tiempoMaduracion} d</td>
                <td style={{textAlign:'right'}}>
                  <button type="button" className="secondary" onClick={()=>editItem(t)} style={{marginRight:8}}>Editar</button>
                  <button type="button" onClick={()=>deleteItem(t.id)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
