import { useState } from "react";
import axios from "axios";

const MaintenanceForm = () => {
    const [maintenance, setMaintenance] = useState({
        id_cargador: "" ,
        id_usuario: "", 
        fecha: "",
        tipo: "Rutino",
        descripcion: ""
    });

    const handleChange = (e) => {
        setMaintenance({ ...maintenance, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/api/maintenance/", maintenance)
            .then(() => {alert("Mantenimiento registrado")
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
            <h1>Registro de Mantenimiento</h1>
            <form onSubmit={handleSubmit}>
                <input type="number" name="id_cargador" placeholder="ID de cargador" onChange={handleChange} required/><br/><br/>
                <input type="number" name="id_usuario" placeholder="ID del usuario" onChange={handleChange}/><br/><br/>
                <input type="date" name="fecha" onChange={handleChange}/><br/><br/>
                <select name="tipo" onChange={handleChange} required>
                    <option value="Rutino">Rutino</option>
                    <option value="Reparativo">Reparativo</option>
                </select><br/><br/>
                <textarea name="descripcion" placeholder="Descripcion" onChange={handleChange} rows="5" cols="50"/><br/><br/>
                <button type="submit">Agregar Mantenimiento</button>
            </form><br/><br/>
            <a href="/owner"><button>Cancelar</button></a>
        </div>
    );
};

export default MaintenanceForm;