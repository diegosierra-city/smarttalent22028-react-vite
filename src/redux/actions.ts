import type { Hotel } from "../types/Hotel";
import type { Room } from "../types/Room";
import axios from "axios";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LIST_HOTELES = "LIST_HOTELES";
export const EDIT_HOTEL = "EDIT_HOTEL";
export const EDIT_ROOM = "EDIT_ROOM";


//import {getCookie,deleteCookie,saveCookie} from '../utilities/cookie'

//import type { Search } from "../types/Search";
//import type { User } from "../types/User";

export const listHoteles = () => {
  // console.log("buscar", search);
  return async (dispatch:any) => {
    try {
      //console.log('filtro',filtroFechas)
      let response = await axios.get(
        `https://backend-smart-talent-22028.onrender.com/hoteles`        
      );
      let data = response.data.data;
      
      return dispatch({
        type: "LIST_HOTELES",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editHotel = (hotel:Hotel) => {
  // console.log("buscar", search);
  return async () => {
    try {
      //console.log('filtro',filtroFechas)
      let response:any
      if(hotel.id===0){
      response = await axios.post(
        `https://backend-smart-talent-22028.onrender.com/hotel`,
        hotel
      );  
      }else{
       response = await axios.put(
        `https://backend-smart-talent-22028.onrender.com/hotel/${hotel.id}`,
        hotel
      ); 
      }
      let data:Hotel = response.data.data;
      
      return {
        type: "EDIT_HOTEL",
        payload: data,
      };
    } catch (error) {
      console.log(error);
    }
  };
};

export const editRoom = (room:Room) => {
  // console.log("buscar", search);
  return async (dispatch:any) => {
    try {
      //console.log('filtro',filtroFechas)
      let response:any
      if(room.id===0){
      response = await axios.post(
        `https://backend-smart-talent-22028.onrender.com/room`,
        room
      );  
      }else{
       response = await axios.put(
        `https://backend-smart-talent-22028.onrender.com/room/${room.id}`,
        room
      ); 
      }
      let data = response.data.data;
      
      return dispatch({
        type: "EDIT_ROOM",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

/* export const searchRooms = (search:Search) => {
  // console.log("buscar", search);
  return async (dispatch:any) => {
    try {
      //console.log('filtro',filtroFechas)
      let response = await axios.post(
        `https://backend-smart-talent-22028.onrender.com/hotel/filtros`,
        filtroFechas
      );
      let data = response.data.data;
      ///se filtra dependiendo del total de pax
      let pax = Number(search.adultos) + Number(search.niños);

      var dataNew = data.filter(function (habitacion) {
        return habitacion.capacidad <= pax;
      });

      dataNew = dataNew.sort(function (a, b) {
        return b.capacidad - a.capacidad;
      });

      return dispatch({
        type: "SEARCH_ROOMS",
        payload: dataNew,
      });
    } catch (error) {
      console.log(error);
    }
  };
}; */



// ----- Authentication -----

export const loginUser = () => {
    return {
      type: LOGIN
    };
  };

export const logoutUser = () => {
  return {
    type: LOGOUT
  };
};