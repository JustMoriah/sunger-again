import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginList = () => {
  const [logins, setLogins] = useState([]);
  const id_usuario = sessionStorage.getItem("id");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/logins/")
      .then(response => {
        console.log("Primer login:", response.data[0]);
        setLogins(response.data);
      })
      .catch(error => {
        console.error("Error al obtener los logins:", error);
        alert("Hubo un error al cargar los logins.");
      });
  }, []);

  const handleDelete = (id_registro) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      axios.delete(`http://localhost:3001/api/logins/id/${id_registro}`)
        .then(() => {
          setLogins(logins.filter(login => login.id_registro !== id_registro));
        })
        .catch(error => {
          console.error("Error al eliminar el login:", error);
          alert("Hubo un error al eliminar el login.");
        });
    }
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
        <thead>
          <tr>
            <th>ID Registro</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Correo</th>
            <th>Contraseña</th>
            {userRole === 1 ? (
              <th>Acciones&nbsp;&nbsp;&nbsp;&nbsp;<a href='/logins/create'><button>Registrar login</button></a></th>
            ) : (
              <p></p>
            )}
          </tr>
        </thead>
        <tbody>
          {logins.map((login) => (
            <tr key={login.id_registro}>
              <td>{login.id_registro}</td>
              <td>{login.nombre}</td>
              <td>{login.ap_pat}</td>
              <td>{login.ap_mat}</td>
              <td>{login.correo}</td>
              <td>{login.contrasena}</td>
              {userRole === 1 ? (
                <td className="action-buttons">
                  <Link to={`/logins/edit/${login.id_registro}`}>
                    <button>Editar</button>
                  </Link>
                  <button onClick={() => handleDelete(login.id_registro)}>Eliminar</button>
                </td>
              ) : (
                <p></p>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoginList;
