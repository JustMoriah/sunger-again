// LoginActions.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';

// Register the necessary chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const LoginActions = () => {
  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/api/logins/')
      .then(response => {
        setLogins(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching login data:", error);
        setLoading(false);
      });
  }, []);

  // If the data is still loading, show a loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  // Grouping actions by date (ignoring time)
  const groupedData = logins.reduce((acc, login) => {
    const date = new Date(login.hora); // Create a Date object from the `hora` field
    const formattedDate = date.toLocaleDateString(); // Format the date (you can modify this to your preferred format)

    const action = login.accion;

    if (!acc[formattedDate]) {
      acc[formattedDate] = { Login: 0, Logout: 0, Registro: 0 };
    }

    if (action === 'Login') {
      acc[formattedDate].Login++;
    } else if (action === 'Logout') {
      acc[formattedDate].Logout++;
    } else if (action === 'Registro') {
      acc[formattedDate].Registro++;
    }

    return acc;
  }, {});

  // Extract the labels (dates) and data for each action
  const labels = Object.keys(groupedData);
  const loginData = labels.map(label => groupedData[label].Login);
  const logoutData = labels.map(label => groupedData[label].Logout);
  const registroData = labels.map(label => groupedData[label].Registro);

  // Prepare chart data
  const data = {
    labels: labels, // Date labels
    datasets: [
      {
        label: 'Login',
        data: loginData,
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
      {
        label: 'Logout',
        data: logoutData,
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Registro',
        data: registroData,
        borderColor: '#FFCE56',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Acciones de Login por Día',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fecha',
        },
        type: 'category', // Display the dates on the X-axis
      },
      y: {
        title: {
          display: true,
          text: 'Cantidad de Acciones',
        },
      },
    },
  };

  return (
    <div>
      <h3>Acciones de Login por Día</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default LoginActions;
