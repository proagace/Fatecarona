import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import AdicionarRota from './pages/adicionarRota'
import Rotas from './pages/rotas'
import AlterarRota from './pages/alterarota'
import Auth from './pages/form'
import MainPage from './pages/main'
import Verify from './pages/verify'
import Perfil from './pages/perfil'
import Oferecer from './pages/oferecer'
import Pedir from './pages/pedir'
import Caronas from './pages/caronas'
import GerencCaronas from './components/LiftPend'
import ResultCaronas from './pages/resultCaronas'
import Config from './pages/config'
import Veiculos from './pages/veiculos'
import AtivarVeic from './pages/ativarveic'
import CadVeiculo from './pages/cadveiculos'
import Recuperar from './pages/recuperar'
import Cadastro from './pages/cadastro'
import { connect } from 'react-redux'
import { setFirebase, updateUser, unsetUser } from './actions/userActions'
import * as firebase from 'firebase'
import menuItems from './menuItems'

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      "apiKey": "AIzaSyA9RLVdFNQblRw4NrVOViAGVvzGsd3EpxE",
      "authDomain": "fatecarona.firebaseapp.com",
      "databaseURL": "https://fatecarona.firebaseio.com",
      "projectId": "fatecarona",
      "storageBucket": "fatecarona.appspot.com",
      "messagingSenderId": "232610915822"
    })
    this.props.dispatch(setFirebase(firebase))
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.dispatch(updateUser(user))
      } else {
        this.props.dispatch(unsetUser())
      }
    })
  }

  logOut() {
    firebase.auth().signOut()
  }

  render() {
    const { history, user, pending } = this.props
    menuItems.forEach(element => element.selected = false)
    let item = menuItems.find(element => element.path === history.location.pathname)
    if (item) item.selected = true

    if (pending) return null

    let isLogged = false
    //if localStorage gets more data then this should be treated differently

    if (history.location.pathname !== '/recuperarsenha' && history.location.pathname !== '/cadastro'){
      if (!window.localStorage.key(0)) return <Auth history={history} alert={false}/>
      if (!user.emailVerified) return <Verify firebase={firebase} logOut={this.logOut.bind(this)}/>
      isLogged = true;
    }

    return (
      <div className="App">
        {isLogged ? <NavBar logOut={this.logOut.bind(this)} menuItems={menuItems}/> : null}
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/rotas" component={Rotas}/>
          <Route path="/rotas/alterar" component={AlterarRota}/>
          <Route path="/rotas/adicionar" component={AdicionarRota}/>
          <Route path="/perfil" component={Perfil}/>
          <Route path="/caronas/historico" component={Caronas}/>
          <Route path="/caronas/request" component={Pedir}/>
          <Route path="/caronas/matches" component={ResultCaronas}/>
          <Route path="/caronas/gerenciar" component={GerencCaronas}/>
          <Route path="/caronas/offer" component={Oferecer}/>
          <Route exact path="/veiculos" component={Veiculos}/>
          <Route path="/veiculos/ativar" component={AtivarVeic}/>
          <Route path="/veiculos/cadastrar" component={CadVeiculo}/>
          <Route path="/recuperarsenha" component={Recuperar}/>
          <Route path="/cadastro" component={Cadastro}/>
          <Route path="/config" render={() => <Config logOut={this.logOut.bind(this)}/>}/>
          <Route render={() => <div>four oh four</div>}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(store => {
  return {
    user: store.user.user,
    pending: store.user.pending,
  }
})(App))
