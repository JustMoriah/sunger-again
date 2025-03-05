import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RoleEdit = () => {
    const { id } = useParams();
    const [role, setRole] = useState({
        nombre_rol: "",
        permisos: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/api/roles/id/${id}`)
            .then(response => {
                setRole({ ...response.data });
            })
            .catch(error => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setRole({ ...role, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/api/roles/id/${id}`, role)
            .then(() => {alert("Rol actualizado")
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
            <h1>Actualizar Usuario</h1>
            <form onSubmit={handleSubmit}>
            <input type="text" name="nombre_rol" placeholder="Nombre del rol" value={role.nombre_rol} onChange={handleChange} required/><br/><br/>
            <input type="text" name="permisos" placeholder="Permisos" value={role.permisos} onChange={handleChange}/><br/><br/>
            <button type="submit">Actualizar Rol</button>
            </form><br />
            <a href="/owner"><button>Cancelar</button></a>
        </div>
    );
};

export default RoleEdit;
