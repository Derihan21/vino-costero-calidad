import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function EstadoSanitario(){
  const [parcela, setParcela] = useState('');
  const [historial, setHistorial] = useState([]);
  const [nuevo, setNuevo] = useState({parcela:'', fechaInspeccion:'', estadoGeneral:'', enfermedadDetectada:null});
  const [tratamiento, setTratamiento] = useState({fecha:'', producto:'', observaciones:''});

  function cargarHistorial(){
    if(!parcela) return;
    axios.get(`/api/estados-sanitarios/parcela/${parcela}`).then(r=>setHistorial(r.data)).catch(e=>console.error(e))
  }

  function crearInspeccion(){
    axios.post('/api/estados-sanitarios', nuevo).then(r=>{ setNuevo({parcela:'', fechaInspeccion:'', estadoGeneral:'', enfermedadDetectada:null}); cargarHistorial(); }).catch(e=>console.error(e))
  }

  function agregarTratamiento(estadoId){
    axios.post(`/api/estados-sanitarios/${estadoId}/tratamientos`, {...tratamiento}).then(r=>{ setTratamiento({fecha:'', producto:'', observaciones:''}); cargarHistorial(); }).catch(e=>console.error(e))
  }

  useEffect(()=>{
    // nada al inicio
  },[])

  return (
    <div>
      <h2>Estado Sanitario</h2>
      <section>
        <h3>Buscar historial por parcela</h3>
        <input placeholder="Parcela" value={parcela} onChange={e=>setParcela(e.target.value)} />
        <button onClick={cargarHistorial}>Cargar</button>
      </section>

      <section>
        <h3>Crear inspección</h3>
        <input placeholder="Parcela" value={nuevo.parcela} onChange={e=>setNuevo({...nuevo, parcela:e.target.value})} />
        <input placeholder="Fecha (YYYY-MM-DD)" value={nuevo.fechaInspeccion} onChange={e=>setNuevo({...nuevo, fechaInspeccion:e.target.value})} />
        <input placeholder="Estado general" value={nuevo.estadoGeneral} onChange={e=>setNuevo({...nuevo, estadoGeneral:e.target.value})} />
        <button onClick={crearInspeccion}>Crear inspección</button>
      </section>

      <section>
        <h3>Historial</h3>
        {historial.length===0 && <div>No hay inspecciones</div>}
        {historial.map(es=> (
          <div key={es.id} style={{border:'1px solid #ddd',padding:10, margin:6}}>
            <div><strong>Parcela:</strong> {es.parcela} <strong>Fecha:</strong> {es.fechaInspeccion} <strong>Estado:</strong> {es.estadoGeneral}</div>
            <div>
              <h4>Tratamientos</h4>
              {es.tratamientos && es.tratamientos.map(t=> (
                <div key={t.id}>{t.fecha} - {t.producto} - {t.observaciones}</div>
              ))}
              <div>
                <input placeholder="Fecha (YYYY-MM-DD)" value={tratamiento.fecha} onChange={e=>setTratamiento({...tratamiento, fecha:e.target.value})} />
                <input placeholder="Producto" value={tratamiento.producto} onChange={e=>setTratamiento({...tratamiento, producto:e.target.value})} />
                <input placeholder="Observaciones" value={tratamiento.observaciones} onChange={e=>setTratamiento({...tratamiento, observaciones:e.target.value})} />
                <button onClick={()=>agregarTratamiento(es.id)}>Agregar tratamiento</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
