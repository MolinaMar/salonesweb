import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({ nombre: '', correo: '', contraseña: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register', form);
      setMensaje(res.data.message);
    } catch (error) {
      setMensaje('Error al registrar');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required /><br />
        <input type="email" name="correo" placeholder="Correo" onChange={handleChange} required /><br />
        <input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} required /><br />
        <button type="submit">Registrarse</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
}

export default App;
