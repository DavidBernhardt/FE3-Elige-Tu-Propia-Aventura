import React from 'react';
import dataJSON from './data.json';
import Swal from 'sweetalert2';

import Historial from './Historial';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      historia: "",
      opcionA: "",
      opcionB: "",
      cuenta: 1,
      capitulo: "",
      historial: []
    };
  }

  componentDidMount() {
    this.setState({
      id: dataJSON[0].id,
      historia: dataJSON[0].historia,
      opcionA: dataJSON[0].opciones.a,
      opcionB: dataJSON[0].opciones.b
    })
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.state.capitulo) {
      const proxCap = dataJSON.find(d => d.id === this.state.capitulo)
      if (previousState.id !== proxCap.id) {
        this.setState({
          id: proxCap.id,
          historia: proxCap.historia,
          opcionA: proxCap.opciones.a,
          opcionB: proxCap.opciones.b
        })
      }
    }

  }

  vueltaACero() {
    Swal.fire('Fin.')
    this.setState({
      id: dataJSON[0].id,
      historia: dataJSON[0].historia,
      opcionA: dataJSON[0].opciones.a,
      opcionB: dataJSON[0].opciones.b,
      cuenta: 1,
      capitulo: "",
      historial: []
    })
  }

  siguienteCapitulo(letra) {
    let capitulo;
    let contador = this.state.cuenta;
    const cantCapitulos = (dataJSON.length - 1) / 2; 
    if (contador <= cantCapitulos) {
      contador++;
      capitulo = contador + letra;

      this.guardarHistorial(letra)

      this.setState({
        cuenta: contador,
        capitulo: capitulo
      })
    } else {
      this.vueltaACero();
    }

  }

  guardarHistorial(letra) {
    const arCap = this.state.historial
    arCap.push(letra)

    this.setState({
      historial: arCap,
    })

  }

  render() {

    return (
      <div className="layout">
        <h2 className="historia">{this.state.historia}</h2>
        <div className="opciones">
          <div className="opcion">
            <button type="button" className="botones" onClick={() => this.siguienteCapitulo("a")}>A</button>
            <h3>{this.state.opcionA}</h3>
          </div>
          <div className="opcion">
            <button type="button" className="botones" onClick={() => this.siguienteCapitulo("b")}>B</button>
            <h3 className="opcion">{this.state.opcionB}</h3>
          </div>
        </div>
        <Historial
          historial={this.state.historial}
          capitulo={this.state.capitulo}
        />
      </div>
    );
  }

}