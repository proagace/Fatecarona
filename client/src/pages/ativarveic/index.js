import React, { Component } from 'react'
import { connect } from 'react-redux'
import CarIcon from 'material-ui/svg-icons/maps/directions-car'
import ImgIcon from 'material-ui/svg-icons/image/assistant-photo'

class AtivarVeic extends Component{
  render(){

    const styles = {
      buttonL: {
        margin: '25px 0',
        marginLeft: '50%',
        borderRadius: '15px',
        backgroundColor: '#6E4D8B',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        fontSize: '25px',
        width: '10em',
      },
      buttonR: {
        margin: '25px 0',
        borderRadius: '15px',
        backgroundColor: '#6E4D8B',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        fontSize: '25px',
        width: '8em'
      },
      buttonEdit: {
        backgroundColor: '#6E4D8B',
        borderColor: '#a8cf45',
        color: '#a8cf45',
        marginLeft:'5px',
        width: '4em',
        fontSize: '18px',
        height: '1.8em'
      },
      marginStyle:{
        marginTop: '2em'
      },
      editSize:{
        width: '4em',
        height: '2em'
      },
      colFormat:{
        textAlign: 'right'
      },
      textFormat:{
        fontSize:'12px'
      }
    }

    return(
      <div className="pageBase">
        <div className="container">
          <form className="form-group">
            <center>
            <div style={styles.marginStyle}>
              <CarIcon color="#000" style={{width: '2em', height: '2em'}}/>
            </div>
            <div className="row" style={styles.marginStyle}>
              <div className="col-6" style={styles.colFormat}>
                MARCA:
              </div>
              <div className="col-0">
                FIAT
              </div>
            </div>

            <div className="row">
              <div className="col-6" style={styles.colFormat}>
                MODELO:
              </div>
              <div className="col-0">
                SIENA
              </div>
            </div>

            <div className="row">
              <div className="col-6" style={{textAlign: 'right', marginTop:'5px'}}>
                <div>LUGARES</div>
              </div>
              <div className="col-0">
                <input type="text" className="form-control" style={styles.editSize}/>
              </div>
              <div className="col-0">
                <button className="btn loginBtn form-control" style={styles.buttonEdit} type="button">Editar</button>
              </div>
            </div>

            <div className="row" style={styles.marginStyle}>
              <div className="col-6" style={{textAlign: 'right'}}>
                <ImgIcon color="#6E4D8B" style={{width: '2em', height: '2em', marginRight: '1.1em'}}/>
                <div style={styles.textFormat}>Viagens já feitas</div>
                <div style={{paddingRight: '2em'}}>0</div>
              </div>
              <div className="col-0">
                <ImgIcon color="#6E4D8B" style={{width: '2em', height: '2em', margin:'0'}}/>
                <div style={styles.textFormat}>Km com viagens</div>
                <div >0</div>
              </div>
            </div>
            </center>
            <div  className="row" style={styles.marginStyle}>
              <div className="col">
                <input type="submit" value="ATIVAR" className="btn loginBtn form-control" style={styles.buttonL}/>
              </div>
              <div className="col">
                <input type="submit" value="EXCLUIR" className="btn loginBtn form-control" style={styles.buttonR}/>
              </div>
          </div>
          </form>
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
})(AtivarVeic)
