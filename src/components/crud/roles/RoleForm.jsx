import { useState } from "react";
import axios from "axios";

const RoleForm = () => {
    const [role, setRole] = useState({
        nombre_rol: "",
        permisos: ""
    });

    const handleChange = (e) => {
        setRole({ ...role, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/api/roles/", role)
            .then(() => {alert("Rol registrado")
                window.location.href = "/owner";
            })
            .catch(error => console.error(error));
    };

    const id_usuario = sessionStorage.getItem("id");
    axios.get(`http://localhost:3001/api/users/id/${id_usuario}`)
    .then((response) => {
        const storedUser = response.data;
        if (storedUser) {
          if (storedUser.id_rol != 1) {
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
            <h1>Registro de Roles</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombre_rol" placeholder="Nombre del rol" onChange={handleChange} required/><br/><br/>
                <input type="text" name="permisos" placeholder="Permisos" onChange={handleChange}/><br/><br/>
                <button type="submit">Agregar Rol</button>
            </form><br/><br/>
            <a href="/owner"><button>Cancelar</button></a>
        </div>
    );
};

export default RoleForm;