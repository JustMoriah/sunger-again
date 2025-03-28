import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx"; // Import the xlsx library

const RoleExcel = () => {
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(""); // For error notifications
  const [excelData, setExcelData] = useState([]); // Store the data from the uploaded Excel
  const [fileName, setFileName] = useState(""); // Store the file name

  // Handle file selection and parse the Excel file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivo(file);
      setFileName(file.name);

      // Read the file using xlsx library
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Get the first sheet data
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert sheet data to JSON (table format)
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(jsonData); // Set the parsed data
      };

      reader.readAsArrayBuffer(file); // Read the file
    }
  };

  // Handle the upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!archivo) {
      setMensaje("");
      setError("Selecciona un archivo Excel");
      return;
    }

    const formData = new FormData();
    formData.append("file", archivo); // Ensure the field name matches "file" on the backend

    try {
      const response = await axios.post("http://localhost:4000/api/excel-rol", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedData = response.data.data; // Ensure 'data' is sent in the response
      setExcelData(updatedData); // Update the table with the merged data

      setError(""); // Clear error message, if any

      // Display message based on response from backend
      const { registrosInsertados, registrosDuplicados } = response.data;
      setMensaje("");
      if (registrosInsertados > 0) {
        setMensaje(`Registros insertados: ${registrosInsertados}`);
      }
      if (registrosDuplicados > 0) {
        setMensaje((prev) => prev + `, Duplicados: ${registrosDuplicados}`);
      }
      if (response.data && response.data.data) {
        setExcelData(response.data.data); // Only set if data is available
      } 
      else {
        setError("No data received from the server");
      }
      
    } catch (error) {
      setError("Error al subir el archivo");
      setMensaje(""); // Clear success message
    }
  };

  // Function to assign row colors based on the status
  const getRowColor = (status) => {
    if (status === "Subido") return "Green"; // Light green
    if (status === "Duplicado") return "Orange"; // Yellow
    if (status === "Datos faltantes") return "Red"; // Light red
    return ""; // Default no color
  };

  return (
    <div>
      <h3>Subir archivo Excel</h3>

      {/* Show success or error messages */}
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Show the Excel content before uploading */}
      {excelData.length > 0 ? (
      <div className='table-container'>
        <h4>Contenido del archivo {fileName}:</h4>
        <table border="1">
          <thead>
            <tr>
              <th>Nombre de Rol</th>
              <th>Permisos</th>
            </tr>
          </thead>
          <tbody>
            {excelData.map((row, index) => (
              <tr key={index} style={{ color: getRowColor(row.status) }}>
                <td>{row.nombre_rol}</td>
                <td>{row.permisos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p>No data available yet. Please upload a file.</p>
    )}


      {/* Form for uploading the Excel */}
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
        />
        <button type="submit">Subir</button>
      </form>
      <p>Refresca pagina para ver cambios</p>
    </div>
  );
};

export default RoleExcel;
