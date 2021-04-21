import React,{useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './Componentes/Formulario.jsx';
import axios from 'axios';
import Cotizacion from './Componentes/Cotizacion.jsx';
import Spinner from './Componentes/Spinner.jsx';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;


function App() {

  const [moneda,guaradarMoneda]= useState('');
  const [Criptomoneda, guardarCriptomoneda]= useState('');
  const [resultado,guardarResultado]= useState({});
  const [cargando, guardarCargando]= useState(false);

  useEffect(() => {

      const cotizarCriptomoneda = async() =>{

        
         if(moneda === '') return;

       const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${Criptomoneda}&tsyms=${moneda}`;      

       const resultado = await axios.get(url);

       guardarCargando(true);

        setTimeout(()=>{

        guardarCargando(false);

        guardarResultado(resultado.data.DISPLAY[Criptomoneda][moneda]);
       },3000);     


      }     
      cotizarCriptomoneda();

      }, [moneda, Criptomoneda]);

      const componente = (cargando) ? <Spinner /> :  <Cotizacion  resultado={resultado} />

  return (
    <Contenedor>
       <div>
         <Imagen
          src={imagen}
          alt="imagen cripto"
       />       
       </div>
       <div>
       <Heading>Cotiza Criptomonedas al Instante</Heading>

       <Formulario
            guardarMoneda={guaradarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
       />

          {componente}
        
       </div>
    </Contenedor> 
  );
}

export default App;
