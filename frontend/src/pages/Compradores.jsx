import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Compradores(){
  const [list, setList] = useState([])
  const empty = {nombreRazonSocial:'',taxId:'',contacto:'',tipoCliente:'distribuidor',estado:'activo'}
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)

  useEffect(()=>{ fetchList() },[])
  function fetchList(){ axios.get('/api/compradores').then(r=>setList(r.data)).catch(()=>setList([])) }

  async function save(e){ e.preventDefault(); try{ if(editing) await axios.put(`/api/compradores/${editing}`, form); else await axios.post('/api/compradores', form); fetchList(); setForm(empty); setEditing(null); } catch(err){ console.error(err); alert('Error') } }
  function edit(it){ setEditing(it.id); setForm({nombreRazonSocial:it.nombreRazonSocial||'',taxId:it.taxId||'',contacto:it.contacto||'',tipoCliente:it.tipoCliente||'distribuidor',estado:it.estado||'activo'}) }
  async function del(id){ if(!confirm('Confirmar?')) return; try{ await axios.delete(`/api/compradores/${id}`); fetchList(); } catch(e){ console.error(e); alert('Error') } }

  return (
    <div style={{display:'flex',gap:20}}>
      <div className="card" style={{width:420}}>
        <h3>{editing? 'Editar Comprador' : 'Nuevo Comprador'}</h3>
        <form onSubmit={save}>
          <div className="form-row"><input placeholder="Nombre / Razón social" value={form.nombreRazonSocial} onChange={e=>setForm({...form,nombreRazonSocial:e.target.value})} required /></div>
          <div className="form-row"><input placeholder="Tax ID" value={form.taxId} onChange={e=>setForm({...form,taxId:e.target.value})} /></div>
          <div className="form-row"><input placeholder="Contacto" value={form.contacto} onChange={e=>setForm({...form,contacto:e.target.value})} /></div>
          <div className="form-row"><select value={form.tipoCliente} onChange={e=>setForm({...form,tipoCliente:e.target.value})}><option>distribuidor</option><option>restaurante</option><option>retail</option><option>particular</option></select></div>
          <div className="form-row"><select value={form.estado} onChange={e=>setForm({...form,estado:e.target.value})}><option>activo</option><option>inactivo</option><option>potencial</option></select></div>
          <div style={{display:'flex',gap:8}}><button type="submit">{editing? 'Actualizar':'Crear'}</button><button type="button" className="secondary" onClick={()=>{setForm(empty); setEditing(null)}}>Limpiar</button></div>
        </form>
      </div>

      <div className="card" style={{flex:1,overflowX:'auto'}}>
        <h3>Listado</h3>
        <table className="table"><thead><tr><th>ID</th><th>Nombre</th><th>TaxID</th><th>Contacto</th><th>Tipo</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            {list.map(it=> (
              <tr key={it.id}><td>{it.id}</td><td>{it.nombreRazonSocial}</td><td>{it.taxId}</td><td>{it.contacto}</td><td>{it.tipoCliente}</td><td>{it.estado}</td>
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
