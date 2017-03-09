import React from 'react';
import { Jumbotron } from 'react-bootstrap';

function NotFound(props){
  return(
    <Jumbotron>
      <h1>Página no encontrada!</h1>
      <p>La página que buscas no existe.</p>
      <p>Volver a la página de inicio</p>
    </Jumbotron>
  );
}

export default NotFound;