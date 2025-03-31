import React from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import ChargerList from '../crud/cargador/ChargerList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ChargerState from '../charts/ChargerState';
import ChargerExcel from '../excel_manage/ChargerExcel';

export default function ChargerManage() {
  const id_usuario = sessionStorage.getItem("id");
  axios.get(`http://localhost:4000/api/users/id/${id_usuario}`)
    .then((response) => {
      const storedUser = response.data;
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
        <NavBar/><br/><br/>
        <h1>Manejo de Cargadores</h1>
        <Tabs>
            <TabList>
                <Tab>Tabla</Tab>
                <Tab>Graficas</Tab>
            </TabList>
            <TabPanel>
                <ChargerList/>
            </TabPanel>
            <TabPanel>
                <ChargerState/>
            </TabPanel>
        </Tabs>
        <ChargerExcel/>
    </div>
  );
}