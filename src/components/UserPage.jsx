import React from 'react';
import isologo from '../assets/isologo.png'
import axios from 'axios';
import NavBar from './NavBar';
import productoImage from '../assets/panel.jpeg';

export default function UserPage() {
  const id_usuario = sessionStorage.getItem("id");
  axios.get(`http://localhost:3001/api/users/id/${id_usuario}`)
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
      <NavBar/><br/><br/><br/>
      <img src={isologo}/>

      
      <div style={{ textAlign: 'center', padding: '20px',  margin: '0 auto', maxWidth: '800px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
        <h2 style={{ margin: '0' }}>Sunger.</h2>
        <h3 style={{ margin: '0' }}><i>Innovación sustentable para un futuro energético eficiente.</i></h3>
      </div>


      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <div style={{ width: '30%', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
          <h4>Sobre nosotros</h4>
          <p>La organización "Sunger" fue fundada en el año 2025 con el propósito de desarrollar soluciones tecnológicas sustentables que promuevan el uso eficiente de la energía renovable. Desde sus inicios, la empresa ha trabajado en la investigación y desarrollo de dispositivos electrónicos que...</p>
          <a href="#sobre-nosotros" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
            <button>Leer más</button>
          </a>
        </div>


        <div style={{ width: '30%', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
          <h4>Producto</h4>
          <p>Los requerimientos técnicos incluyen un Jack USB para transferencia de datos y energía, paneles solares policristalinos de 5-6 que convierten la luz solar en electricidad, diodos rectificadores que transforman la corriente alterna en corriente directa, y capacitores que almacenan energía eléctrica.</p>
          <a href="#producto" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
            <button>Leer más</button>
          </a>
        </div>


        <div style={{ width: '30%', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
          <h4>Ubicación</h4>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15090.418268427822!2d-99.47541!3d19.34026!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428a9d7b5bcd4b5%3A0x548f65d8b9ea5b34!2sUniversidad+Tecnol%C3%B3gica+del+Valle+de+Toluca!5e0!3m2!1ses!2smx!4v1618374985935!5m2!1ses!2smx"
            width="200"
            height="200"
            allowFullScreen=""
            loading="lazy"
            title="Ubicación"
          ></iframe> 
          <a href="#ubicacion" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
            <button>Leer más</button>
          </a>
        </div>
      </div>


      <div id="sobre-nosotros" style={{ width: '100%', height: '300px', marginTop: '20px', backgroundColor: '#e0f7fa', padding: '20px', boxSizing: 'border-box' }}>
        <h4>Sobre nosotros.</h4>
        <p>La organización "Sunger" fue fundada en el año 2025 con el propósito de desarrollar soluciones tecnológicas sustentables que promuevan el uso eficiente de la energía renovable. Desde sus inicios, la empresa ha trabajado en la investigación y desarrollo de dispositivos electrónicos que minimicen la huella de carbono y optimicen el consumo energético. Actualmente, Sunger está enfocado para los estudiantes de la universidad tecnológica del valle de Toluca.</p>
      </div>


      <div id="producto" style={{ width: '100%', height: 'fit-content', marginTop: '20px', backgroundColor: '#e0f7fa', padding: '20px', boxSizing: 'border-box' }}>
        <h4>Producto.</h4>
        <p>Los requerimientos técnicos incluyen un Jack USB para transferencia de datos y energía, paneles solares policristalinos de 6V que convierten la luz solar en electricidad, diodos rectificadores que transforman la corriente alterna en corriente directa, y capacitores que almacenan energía eléctrica.</p>
        <img src={productoImage} alt="Producto" style={{ maxWidth: '50%', height: 'auto', marginTop: '10px' }} />          
      </div>
        

      <div id="ubicacion" style={{ width: '100%', height: 'fit-content', marginTop: '20px', backgroundColor: '#e0f7fa', padding: '20px', boxSizing: 'border-box' }}>
        <h4>Ubicación.</h4>
        <p>Nos ubicamos en la Universidad Tecnologica del Valle de Toluca.</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15090.418268427822!2d-99.47541!3d19.34026!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428a9d7b5bcd4b5%3A0x548f65d8b9ea5b34!2sUniversidad+Tecnol%C3%B3gica+del+Valle+de+Toluca!5e0!3m2!1ses!2smx!4v1618374985935!5m2!1ses!2smx"
          width="800"
          height="400"
          allowFullScreen=""
          loading="lazy"
          title="Ubicación"
        ></iframe>              
      </div>
    </div>
  )
}
