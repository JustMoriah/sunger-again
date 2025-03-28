import { useEffect, useState } from "react";
import axios from "axios";

const MaintenanceForm = () => {
    const [users, setUsers] = useState([]);
    const [chargers, setChargers] = useState([]);

    const [maintenance, setMaintenance] = useState({
        id_cargador: "" ,
        id_usuario: "", 
        fecha: "",
        tipo: "Rutino",
        descripcion: ""
    });

    useEffect(() => {
        axios.get("http://localhost:4000/api/users/")
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
        axios.get("http://localhost:4000/api/chargers/")
            .then(response => setChargers(response.data))
            .catch(error => console.error(error));
      }, []);

    const handleChange = (e) => {
        setMaintenance({ ...maintenance, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/api/maintenance/", maintenance)
            .then(() => {alert("Mantenimiento registrado")
                window.location.href = "/maintenance";
            })
            .catch(error => console.error(error));
    };

    const id_usuario = sessionStorage.getItem("id");
    axios.get(`http://localhost:4000/api/users/id/${id_usuario}`)
    .then((response) => {
        const storedUser = response.data;
        if (storedUser) {
          if (storedUser.id_rol != 1 && storedUser.id_rol != 2) {
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
                <select name="id_cargador" value={maintenance.id_cargador} onChange={handleChange} required>
                    <option value="">-- Selecciona Cargador --</option>
                        {chargers.length > 0 ? (
                            chargers.map((charger) => (
                                <option key={charger.id_cargador} value={charger.id_cargador}>
                                    {charger.id_cargador} - {charger.ubicacion}
                                </option>
                            ))
                        ) : (
                            <option value="">Cargadores no encontrados</option>
                        )}
                </select><br/><br/>
                <select name="id_usuario" value={maintenance.id_usuario} onChange={handleChange} required>
                    <option value="">-- Selecciona Usuario --</option>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <option key={user.id_usuario} value={user.id_usuario}>
                                    {user.id_usuario} - {user.correo}
                                </option>
                            ))
                        ) : (
                            <option value="">Usuarios no encontrados</option>
                        )}
                </select><br/><br/>
                <input type="date" name="fecha" onChange={handleChange}/><br/><br/>
                <select name="tipo" onChange={handleChange} required>
                    <option value="Rutino">Rutino</option>
                    <option value="Reparativo">Reparativo</option>
                </select><br/><br/>
                <textarea name="descripcion" placeholder="Descripcion" onChange={handleChange} rows="5" cols="50"/><br/><br/>
                <button type="submit">Agregar Mantenimiento</button>
            </form><br/><br/>
            <a href="/maintenance"><button>Cancelar</button></a>
        </div>
    );
};

export default MaintenanceForm;