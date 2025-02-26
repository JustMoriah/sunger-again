import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [user, setUser] = useState({
        correo: "",
        contraseña: ""
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3001/api/users/correo/${user.correo}`)
            .then((response) => {
                const storedUser = response.data;
                if (storedUser) {
                    if (storedUser.contraseña === user.contraseña) {
                        sessionStorage.setItem("id", `${storedUser.id_usuario}`);
                        if (storedUser.id_rol === 1) {
                            window.location.href = "/owner";
                        } else if (storedUser.id_rol === 2) {
                            window.location.href = "/admin";
                        } else if (storedUser.id_rol === 3) {
                            window.location.href = "/home";
                        }
                    } else {
                        alert("Contraseña incorrecta.");
                    }
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    alert("Usuario no encontrado, por favor registrate.");
                    window.location.href = "/signup";
                } else {
                    console.error("An error occurred while checking for the email:", error);
                }
            });
    };
    

    return (
        <div>
            <div class="login">
                <h1>Iniciar Sesion</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="correo" placeholder="Correo Electronico" onChange={handleChange} required/><br/><br/>
                    <input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} required/><br/><br/>
                    <button type="submit">Iniciar Sesion</button>
                </form><br/>
            </div>
            <p>¿No tienes cuenta? <a href="/signup">Registrate</a>.</p>
        </div>
    );
};

export default Login;