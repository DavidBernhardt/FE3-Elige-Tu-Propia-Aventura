import React from 'react';

export default class Historial extends React.Component {
  
  render(){
    const historialDeCapitulos = this.props.historial;
    const lista = historialDeCapitulos.map((cap, index) => <li key={index}>{cap}</li>)

    return (
      <div className="recordatorio">
        <h3>Seleccion anterior: {this.props.capitulo}</h3>
        <h3>Historial de opciones elegidas:</h3>
        <ul>{lista}</ul>
      </div>
    );
  }

}