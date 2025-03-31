import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CurrentLevels = () => {
  const [data, setData] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);
  const [corrienteData, setCorrienteData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/get/energia');
        const results = response.data;

        // Extract the data for the graph
        const labels = results.map(item => item.hora);  // Get time for the x-axis
        const corriente = results.map(item => parseFloat(item.corriente));  // Get corriente for y-axis
        
        setTimeLabels(labels);
        setCorrienteData(corriente);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Refresh data every 10 seconds to simulate real-time updates
    const interval = setInterval(fetchData, 4000); // 10000ms = 10 seconds
    return () => clearInterval(interval);  // Clear interval when component unmounts
  }, []);

  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Corriente (mA)',
        data: corrienteData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monitoreo de corriente en tiempo real',
      },
    },
  };

  return (
    <div>
      <h2>Monitoreo de corriente</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CurrentLevels;
