import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function RoleList() {
  const [roles, setRoles] = useState([]);
  const id_usuario = sessionStorage.getItem("id");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/roles/")
        .then(response => setRoles(response.data))
        .catch(error => console.error(error));
  }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/api/roles/id/${id}`)
            .then(() => {setRoles(roles.filter(role => role.id_rol !== id))
              alert("¡Rol ha sido destruido en el sol!");
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
            <th>Nombre</th>
            <th>Permisos</th>
            {userRole === 1 ? (
                <th>Acciones&nbsp;&nbsp;&nbsp;&nbsp;<a href='/role/create'><button>Registrar rol</button></a></th>
            ) : (
            <p></p>
            )}
          </tr>
          {roles.map(role => (
            <tr key={role.id_rol}>
              <td>{role.id_rol}</td>
              <td>{role.nombre_rol}</td>
              <td>{role.permisos}</td>
              {userRole === 1 ? (
                <td className="action-buttons"><Link to={`/role/edit/${role.id_rol}`}><button>Editar</button></Link>
                <button onClick={() => handleDelete(role.id_rol)}>Eliminar</button></td>
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
