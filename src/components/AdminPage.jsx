import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from './NavBar';

export default function AdminPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/users/")
        .then(response => setUsers(response.data))
        .catch(error => console.error(error));
  }, []);

  const handleRoleChange = (id_usuario, newRole) => {
    const updatedUsers = users.map(user => {
      if (user.id_usuario === id_usuario) {
        return { ...user, id_rol: newRole };
      }
      return user;
    });
    setUsers(updatedUsers);

    axios.put(`http://localhost:3001/api/users/${id_usuario}`, { id_rol: newRole })
      .then(response => {
        alert("¡El rol ha sido actualizado exitosamente!");
      })
      .catch(error => {
        console.error("Error updating role:", error);
      });
  };

  const id_usuario = sessionStorage.getItem("id");
  axios.get(`http://localhost:3001/api/users/id/${id_usuario}`)
    .then((response) => {
        const storedUser = response.data;
        if (storedUser) {
          if (storedUser.id_rol != 1 && storedUser.id_rol != 2) {
            window.location.href = "/home";
          }
        }
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        window.location.href = "/login";
    } else {
        console.error("An error occurred while checking for the email:", error);
    }
    });
  return (
    <div>
      <NavBar/><br/><br/>
      <h1>Hello, admin world!</h1>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>E-mail</th>
            <th>Nombre(s)</th>
            <th>Apellido(s)</th>
            <th>Fecha de Nacimiento</th>
            <th>Rol</th>
          </tr>
          {users.map(user => (
            <tr key={user.id_usuario}>
              <td>{user.id_usuario}</td>
              <td>{user.correo}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.fn}</td>
              <td>
                <select name='id_rol' value={user.id_rol} onChange={(e) => handleRoleChange(user.id_usuario, e.target.value)}>
                  <option value="1">Dueño</option>
                  <option value="2">Admin</option>
                  <option value="3">Usuario</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
