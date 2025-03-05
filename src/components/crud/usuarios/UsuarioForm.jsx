import { useState } from "react";
import axios from "axios";

const UsuarioForm = () => {
    const [user, setUser] = useState({
        id_rol: "3",
        nombre: "",
        apellido: "",
        fn: "",
        correo: "",
        contrasena: ""
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/api/users/", user)
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
            <h1>Registro de Usuarios</h1>
            <form onSubmit={handleSubmit}>
                <label>Rol: </label>
                <select name="id_rol" value="3" onChange={handleChange} required>
                    <option value="1">Dueno</option>
                    <option value="2">Admin</option>
                    <option value="3">Usuario</option>
                </select><br/>
                <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required/><br/><br/>
                <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} required/><br/><br/>
                <input type="date" name="fn" onChange={handleChange} required/><br/><br/>
                <input type="email" name="correo" placeholder="Correo Electronico" onChange={handleChange} required/><br/><br/>
                <input type="password" name="contrasena" placeholder="Contraseña" onChange={handleChange} required/><br/><br/>
                <button type="submit">Agregar Usuario</button>
            </form><br/><br/>
            <a href="/owner"><button>Cancelar</button></a>
        </div>
    );
};

export default UsuarioForm;