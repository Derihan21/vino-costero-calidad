import React, {useState} from 'react'

export default function Login({onLogin}){
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  function submit(e){ e.preventDefault(); // allow any credential per requirement
    onLogin({username:user});
  }
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'60vh'}}>
      <form onSubmit={submit} style={{width:320, padding:20, border:'1px solid #ddd',borderRadius:6}}>
        <h3>Iniciar sesión</h3>
        <input placeholder="Usuario" value={user} onChange={e=>setUser(e.target.value)} required />
        <input placeholder="Contraseña" type="password" value={pass} onChange={e=>setPass(e.target.value)} required />
        <div style={{display:'flex',gap:8,marginTop:10}}>
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  )
}
