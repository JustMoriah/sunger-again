import { useState } from "react";
import axios from "axios";

const UploadExcel = () => {
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!archivo) {
      setMensaje("Selecciona un archivo Excel");
      return;
    }

    const formData = new FormData();
    formData.append("file", archivo); // Asegúrate de que el nombre del campo sea "file"

    try {
      const response = await axios.post("http://localhost:3001/api/subir-excel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMensaje(`Registros insertados: ${response.data.registrosInsertados}, Duplicados: ${response.data.registrosDuplicados}`);
    } catch (error) {
      setMensaje("Error al subir el archivo");
    }
  };

  return (
    <div>
      <h3>Subir archivo Excel</h3>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
        <button type="submit">Subir</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default UploadExcel;