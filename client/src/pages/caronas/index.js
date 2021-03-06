import React, { Component } from 'react'
import LiftMgt from '../../components/LiftMgt'
import config from '../../config.json'
import axios from 'axios'
import { connect } from 'react-redux'
import { carregar, espiarMembro } from '../../actions/liftActions'

class Caronas extends Component {

    constructor(props){
      super(props);
      this.state = {
        status: 'andamento',
        byID: [],
        loaded: false
      };
    }

    handleClick(status) {
      this.setState({
        status: status
      })
    }

    handleActivation = (carona) =>{
      this.props.dispatch(carregar(carona));
      this.props.history.push('/caronas/gerenciar')
    }

    handleEspiar = (carona) => {
      this.props.dispatch(espiarMembro(carona.emailMotorista));
      this.props.history.push('/perfil/espiar')
    }

    buscaCaronas = () =>{
      let byID = this.state.byID
      switch(this.state.status) {
        case 'pendente':{
          return (
            byID.filter(carona => carona.status === 'pendente')
          )
        }
        case 'andamento':{
          return byID.filter(carona => carona.status === 'andamento')
        }
        case 'historico':{
          return byID.filter(carona => carona.status === 'historico')
        }
        default:{}
      }
    }


    loadCarona = () => {
      axios.get(config.endpoint + "/lift/motorista/" + this.props.userData.email)
      .then(resultEmail =>{
        axios.get(config.endpoint + "/caronista/" + this.props.userData.email)
        .then((resultCaronista)=>{
          this.caronasbyID(resultCaronista.data)
            .then(resultID =>{
                this.setState({
                  byID : resultEmail.data.concat(resultID),
                  loaded: true
                })
            })
            .catch((err) => console.log(err))
        })

      })
    }



    caronasbyID = (listaCaronista) =>{
      var caronasID=[];
        return new Promise((resolve, reject)=>{
          if (listaCaronista.length === 0) resolve(caronasID)
          listaCaronista.forEach((e, index) => {
            axios.get(config.endpoint + "/lift/id/" + e.id)
            .then(result => {
              caronasID.push(result.data[0])
              if (index === (listaCaronista.length -1)){
                resolve(caronasID)
              }
            })
            .catch((err) => reject(err.message))
          })
        })
    }


  render() {

    if (!this.state.loaded && typeof this.props.userData.email !== "undefined") this.loadCarona()

    const styles = {
      btn: {
        borderRadius: '8px',
        backgroundColor: '#6E4D8B',
        borderColor: '#ffffff',
        color: '#ffffff',
        fontSize: '12px',
        width:'12em'
      },
      tab:{
        backgroundColor: '#D2D3D5',
        height: '2.5em'
      },
    }
    var caronas = this.buscaCaronas();

    return (
      <div>
        <ul className="nav nav-pills row" id="pills-tab" role="tablist" style={styles.tab}>
          <li className="nav-item col-4">
            <label className="nav-link active" id="pills-andamento-tab" data-toggle="pill" role="tab" aria-selected="true" onClick={() => this.handleClick("andamento")}>
              <center>Andamento</center>
            </label>
          </li>
          <li className="nav-item col-4">
            <label className="nav-link" id="pills-historico-tab" data-toggle="pill" role="tab" aria-selected="false" onClick={() => this.handleClick("historico")}>
              <center>Histórico</center>
            </label>
          </li>
          <li className="nav-item col-4">
            <label className="nav-link" id="pills-pendente-tab" data-toggle="pill" role="tab" aria-selected="false" onClick={() => this.handleClick("pendente")}>
              <center>Pendente</center>
            </label>
          </li>
        </ul>
        {
          caronas.length > 0 ?
            caronas.map((carona, key)=>
            <div key={key} className="container">
              <div className="row" key={key} style={{borderBottom: '2px solid grey'}}>
                <div className="col-12">
                  {
                    carona.emailMotorista === this.props.userData.email ?
                      <LiftMgt
                        infomotorista={carona.emailMotorista}
                        caronista = {0}
                        data={carona.dataCarona}
                        tipo={carona.tipo}
                        status={carona.status}
                      />
                    :
                      <LiftMgt
                        infomotorista={carona.emailMotorista}
                        caronista = {1}
                        data={carona.dataCarona}
                        tipo={carona.tipo}
                        status={carona.status}
                      />
                  }
                </div>
                <div className="container" style={{marginBottom:'1em'}}>
                  <div className="row justify-content-center">
                      <div className="col" style={{textAlign:'right'}}>
                        <input type="button" style={styles.btn} onClick={() => this.handleActivation(carona)} className="btn btn-primary" value="GERENCIAR" />
                      </div>
                      <div className="col">
                        {
                         carona.status !== 'historico' && carona.emailMotorista !== this.props.userData.email ?
                             <input type="button" style={styles.btn}  onClick ={() => this.handleEspiar(carona)} className="btn btn-primary" value="ESPIAR MOTORISTA" />
                         :
                           <div></div>
                         }
                      </div>
                    </div>
                </div>
              </div>
            </div>
            )
          :
            <div>Nenhuma Carona.</div>
        }
      </div>
    )
  }
}

export default connect(store => {
  return {
    userData: store.user.userData
  }
})(Caronas)
