import axios from 'axios'
import config from '../config.json'

export function ativar(car) {
  return{
    type: "ATIVAR_VEICULO",
    payload: car
  }
}

export function insertCar(car) {
  return {
    type: "INSERT_CAR",
    payload: axios.post(config.endpoint + "/cars", car)
  }
}

export function loadCar(email) {
  return {
    type: "LOAD_CAR",
    payload: axios.get(config.endpoint + "/cars/" + email)
  }
}