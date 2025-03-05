import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function ChargerList() {
  const [chargers, setChargers] = useState([]);
  const id_usuario = sessionStorage.getItem("id");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/chargers/")
        .then(response => setChargers(response.data))
        .catch(error => console.error(error));
  }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/api/chargers/id/${id}`)
            .then(() => {setChargers(chargers.filter(charger => charger.id_cargador !== id))
              alert("Cargador ha sido eliminado.");
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
            <th>Ubicacion</th>
            <th>Estado</th>
            {userRole === 1 ? (
                <th>Acciones&nbsp;&nbsp;&nbsp;&nbsp;<a href='/charger/create'><button>Registrar cargador</button></a></th>
            ) : (
            <p></p>
            )}
          </tr>
          {chargers.map(charger => (
            <tr key={charger.id_cargador}>
              <td>{charger.id_cargador}</td>
              <td>{charger.ubicacion}</td>
              <td>{charger.estado}</td>
              {userRole === 1 ? (
                <td className="action-buttons"><Link to={`/charger/edit/${charger.id_cargador}`}><button>Editar</button></Link>
                <button onClick={() => handleDelete(charger.id_cargador)}>Eliminar</button></td>
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
