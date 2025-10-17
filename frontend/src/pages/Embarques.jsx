import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Embarques(){
  const [list, setList] = useState([])
  const empty = {fechaEnvio:'',transportista:'',destino:'',condicionesTransporte:'',estado:'preparando',compradores:[],documentacion:''}
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)

  useEffect(()=>{ fetchList() },[])
  function fetchList(){ axios.get('/api/embarques').then(r=>setList(r.data)).catch(()=>setList([])) }

  async function save(e){ e.preventDefault(); try{ const payload = {...form}; // compradores expects array of objects with id
    payload.compradores = (form.compradores||[]).map(id=>({id}));
    if(editing) await axios.put(`/api/embarques/${editing}`, payload); else await axios.post('/api/embarques', payload);
    fetchList(); setForm(empty); setEditing(null);
  } catch(err){ console.error(err); alert('Error guardando embarque') } }

  function edit(it){ setEditing(it.id); setForm({fechaEnvio:it.fechaEnvio||'',transportista:it.transportista||'',destino:it.destino||'',condicionesTransporte:it.condicionesTransporte||'',estado:it.estado||'preparando',compradores:(it.compradores||[]).map(c=>c.id),documentacion:it.documentacion||''}) }
  async function del(id){ if(!confirm('Confirmar?')) return; try{ await axios.delete(`/api/embarques/${id}`); fetchList(); } catch(e){ console.error(e); alert('Error al eliminar') } }

  return (
    <div style={{display:'flex',gap:20}}>
      <div className="card" style={{width:420}}>
        <h3>{editing? 'Editar Embarque':'Nuevo Embarque'}</h3>
        <form onSubmit={save}>
          <div className="form-row"><input type="date" value={form.fechaEnvio} onChange={e=>setForm({...form,fechaEnvio:e.target.value})} required /></div>
          <div className="form-row"><input placeholder="Transportista" value={form.transportista} onChange={e=>setForm({...form,transportista:e.target.value})} /></div>
          <div className="form-row"><input placeholder="Destino" value={form.destino} onChange={e=>setForm({...form,destino:e.target.value})} /></div>
          <div className="form-row"><input placeholder="Condiciones transporte" value={form.condicionesTransporte} onChange={e=>setForm({...form,condicionesTransporte:e.target.value})} /></div>
          <div className="form-row"><select value={form.estado} onChange={e=>setForm({...form,estado:e.target.value})}><option>preparando</option><option>en tránsito</option><option>entregado</option><option>con incidencias</option></select></div>
          <div className="form-row"><input placeholder="IDs de compradores (coma separados)" value={(form.compradores||[]).join(',')} onChange={e=>setForm({...form,compradores: e.target.value.split(',').map(s=>s.trim()).filter(Boolean).map(Number)})} /></div>
          <div style={{display:'flex',gap:8}}><button type="submit">{editing? 'Actualizar' : 'Crear'}</button><button type="button" className="secondary" onClick={()=>{setForm(empty); setEditing(null)}}>Limpiar</button></div>
        </form>
      </div>

      <div className="card" style={{flex:1,overflowX:'auto'}}>
        <h3>Listado de Embarques</h3>
        <table className="table"><thead><tr><th>ID</th><th>Fecha</th><th>Transportista</th><th>Destino</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            {list.map(it=> (
              <tr key={it.id}><td>{it.id}</td><td>{it.fechaEnvio}</td><td>{it.transportista}</td><td>{it.destino}</td><td>{it.estado}</td>
                <td style={{textAlign:'right'}}>
                  <button className="secondary" onClick={()=>edit(it)} style={{marginRight:8}}>Editar</button>
                  <button onClick={()=>del(it.id)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
