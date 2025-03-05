import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function MaintenanceList() {
  const [maintenance, setMaintenance] = useState([]);
  const id_usuario = sessionStorage.getItem("id");
  const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/api/maintenance/")
        .then(response => {
            // Format the birth date for each user to YYYY-MM-DD
            const formattedMaintenance = response.data.map(maintenance => {
            const formattedDate = new Date(maintenance.fecha).toISOString().split('T')[0]; // Format the date
            return { ...maintenance, fecha: formattedDate }; // Update user with formatted date
            });
            setMaintenance(formattedMaintenance);
        })
        .catch(error => console.error(error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/api/maintenance/id/${id}`)
            .then(() => {setMaintenance(maintenance.filter(maintenance => maintenance.id_rol !== id))
              alert("¡Mantenimiento ha sido destruido en el sol!");
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
            <th>ID Cargador</th>
            <th>ID Usaurio</th>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Descripcion</th>
            {userRole === 1 ? (
                <th>Acciones&nbsp;&nbsp;&nbsp;&nbsp;<a href='/maintenance/create'><button>Registrar mantenimiento</button></a></th>
            ) : (
            <p></p>
            )}
          </tr>
          {maintenance.map(maintenance => (
            <tr key={maintenance.id_historial}>
              <td>{maintenance.id_historial}</td>
              <td>{maintenance.id_cargador}</td>
              <td>{maintenance.id_usuario}</td>
              <td>{maintenance.fecha}</td>
              <td>{maintenance.tipo}</td>
              <td>{maintenance.descripcion}</td>
              {userRole === 1 ? (
                <td className="action-buttons"><Link to={`/maintenance/edit/${maintenance.id_historial}`}><button>Editar</button></Link>
                <button onClick={() => handleDelete(maintenance.id_historial)}>Eliminar</button></td>
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
