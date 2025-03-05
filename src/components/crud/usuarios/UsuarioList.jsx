import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function UsuarioList() {
  const [users, setUsers] = useState([]);
  const id_usuario = sessionStorage.getItem("id");
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
      axios.get("http://localhost:3001/api/users/")
        .then(response => {
          // Format the birth date for each user to YYYY-MM-DD
          const formattedUsers = response.data.map(user => {
            const formattedDate = new Date(user.fn).toISOString().split('T')[0]; // Format the date
            return { ...user, fn: formattedDate }; // Update user with formatted date
          });
          setUsers(formattedUsers);
        })
        .catch(error => console.error(error));
    }, []);

    const handleRoleChange = (id_usuario, newRole) => {
      if (newRole === "1" && userRole !== 1) {
        // If the logged-in user is not an "Owner" (role 1), prevent changing to role 1
        alert("No tienes permiso para asignar el rol de 'Dueno'.");
        return;
      }
  
      const updatedUsers = users.map(user => {
        if (user.id_usuario === id_usuario) {
          return { ...user, id_rol: newRole };
        }
        return user;
      });
      setUsers(updatedUsers);
  
      axios.put(`http://localhost:3001/api/users/id/${id_usuario}`, { id_rol: newRole })
        .then(response => {
          alert("¡El rol ha sido actualizado exitosamente!");
        })
        .catch(error => {
          console.error("Error updating role:", error);
        });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/api/users/id/${id}`)
            .then(() => {setUsers(users.filter(user => user.id_usuario !== id))
              alert("¡Registro del usuario ha sido destruido en el sol!");
              window.location.href = "/owner";
            })
            .catch(error => console.error(error));
    };

    axios.get(`http://localhost:3001/api/users/id/${id_usuario}`)
        .then((response) => {
            const storedUser = response.data;
            if (storedUser) {
                setUserRole(storedUser.id_rol);
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 404) {
                window.location.href = "/login";
            } else {
                console.error("An error occurred while fetching user data:", error);
            }
        });
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>E-mail</th>
            <th>Nombre(s)</th>
            <th>Apellido(s)</th>
            <th>Fecha de Nacimiento</th>
            <th>Rol</th>
            {userRole === 1 ? (
                <th>Acciones&nbsp;&nbsp;&nbsp;&nbsp;<a href='/user/create'><button>Registrar usuario</button></a></th>
            ) : (
            <p></p>
            )}
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
              {userRole === 1 ? (
                <td className="action-buttons"><Link to={`/user/edit/${user.id_usuario}`}><button>Editar</button></Link>
                <button onClick={() => handleDelete(user.id_usuario)}>Eliminar</button></td>
                ) : (
                    <p></p>
                )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
