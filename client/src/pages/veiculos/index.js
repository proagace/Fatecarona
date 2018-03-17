import React, { Component } from 'react'
import Veiculo from '../../components/Veiculo'
import { connect } from 'react-redux'

const veiculos = [
  {
    marca: 'FIAT',
    modelo: 'SIENA',
    placa : 'GHJ-8930'
  },
  {
    marca: 'VOLKSWAGEN',
    modelo: 'FUSCA',
    placa : 'YUJ-7381'
  },
  {
    marca: 'MITSUBISHI',
    modelo: 'PAJERO',
    placa : 'COC-2355'
  },
]

class Veiculos extends Component{

  handleActivation = (carPlate) =>{
    this.props.history.push('/veiculos/ativar/' + carPlate)
  }

  render(){
    const styles = {
      button: {
        margin: '25px 0',
        borderRadius: '25px',
        backgroundColor: '#6E4D8B',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        fontSize: '25px',
      },
      carButton:{
        margin: '25px 0',
        borderRadius: '25px',
        backgroundColor: 'transparent',
        fontSize: '15px'
      }
    }

    return(
      <div className="pageBase">
        <div className="container">
            {veiculos.map(veiculo =>
              <div className="row" style={{padding: '0em 0', margin: '0', borderBottom: '2px solid grey'}}>
                <button className="btn loginBtn" onClick={() => this.handleActivation(veiculo.placa)} style={styles.carButton}>
                  <Veiculo
                    marca={veiculo.marca}
                    modelo={veiculo.modelo}
                    placa={veiculo.placa}
                    key={veiculo.placa}
                  />
                </button>
              </div>
            )}
            <input type="button" value="ADICIONAR" className="btn loginBtn btn-block" style={styles.button}/>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    user: store.user.user,
    userData: store.user.userData
  }
})(Veiculos)