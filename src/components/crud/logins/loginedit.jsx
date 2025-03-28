import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LoginEdit = () => {
    const { id } = useParams();
    const [login, setLogin] = useState({
        nombre_rol: "",
        permisos: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:4000/api/logins/id/${id}`)
            .then(response => {
                setLogin({ ...response.data });
            })
            .catch(error => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4000/api/logins/id/${id}`, login)
            .then(() => {alert("Login actualizado")
                window.location.href = "/owner";
            })
            .catch(error => console.error(error));
    };

    const id_usuario = sessionStorage.getItem("id");
    axios.get(`http://localhost:4000/api/users/id/${id_usuario}`)
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
            <h1>Actualizar Login</h1>
            <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre" value={login.nombre} onChange={handleChange} required/><br/><br/>
            <input type="text" name="ap_pat" placeholder="Apellido Paterno" value={login.ap_pat} onChange={handleChange}/><br/><br/>
            <input type="text" name="ap_mat" placeholder="Apellido Materno" value={login.ap_mat} onChange={handleChange}/><br/><br/>
            <input type="email" name="correo" placeholder="E-mail" value={login.correo} onChange={handleChange}/><br/><br/>
            <input type="password" name="contrasena" placeholder="Contraseña" value={login.contrasena} onChange={handleChange}/><br/><br/>
            <button type="submit">Actualizar Login</button>
            </form><br />
            <a href="/owner"><button>Cancelar</button></a>
        </div>
    );
};

export default LoginEdit;
