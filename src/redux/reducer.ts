import {
 LOGIN,
 LOGOUT,
 LIST_HOTELES,
 EDIT_HOTEL,
 EDIT_ROOM
} from "./actions";
import type { Hotel } from "../types/Hotel";
import type { Room } from "../types/Room";

const initialState = {
 hoteles: [],
 habitaciones: [],
 login: false,
  
};

/*function ordenar(array: Array<any>, order:string) {
 let roomsOrder = array;
 let newRoomsOrder = [];
 if (order === "Precio Menor") {
   newRoomsOrder = roomsOrder.sort(function (a, b) {
     return a.precio - b.precio;
   });
 } else if (order === "Precio Mayor") {
   newRoomsOrder = roomsOrder.sort(function (a, b) {
     return b.precio - a.precio;
   });
 } else if (order === "Capacidad") {
   newRoomsOrder = roomsOrder.sort(function (a, b) {
     return b.capacidad - a.capacidad;
   });
 } else if (order === "Name") {
   newRoomsOrder = roomsOrder.sort((a, b) => {
     if (a[order] < b[order]) {
       return -1;
     }
     if (a[order] > b[order]) {
       return 1;
     }
     return 0;
   });
 }
 //
 return newRoomsOrder;
}*/

export default function rootReducer(state = initialState, action:any) {
 switch (action.type) {
   case LOGIN:
     return {
       ...state,
       login: true,
     };

    case LOGOUT:
     return {
       ...state,
       login: false,
     };

case LIST_HOTELES:
     return {
       ...state,
       hoteles: action.payload['hoteles'],
       habitaciones: action.payload['habitaciones'],
     };

case EDIT_HOTEL:
 //si existe el id en la lista de hoteles
 let updatedHotels: any 
 if (state.hoteles.find((h:Hotel) => h.id === action.payload.id)) {
   //actualiza el hotel
   updatedHotels = state.hoteles.map((h:Hotel) =>
     h.id === action.payload.id ? action.payload : h
   );
   
 }
 /// sino entonces se agrega al array de los hoteles
 else {
   updatedHotels = [...state.hoteles, action.payload];
 }
 //
     return {
       ...state,
       hoteles: updatedHotels,
     };
     
     case EDIT_ROOM:
       //si existe el id en la lista de hoteles
       let updatedRooms: any 
       if (state.habitaciones.find((h:Room) => h.id === action.payload.id)) {
         //actualiza el hotel
         updatedRooms = state.habitaciones.map((h:Room) =>
           h.id === action.payload.id ? action.payload : h
         );
         
       }
       /// sino entonces se agrega al array de los habitaciones
       else {
         updatedRooms = [...state.habitaciones, action.payload];
       }
       //
           return {
             ...state,
             habitaciones: updatedRooms,
           };    

   /* case GET_HABITACIONES:
     return {
       ...state,
       habitaciones: [...action.payload],
     };

   case PUT_HABITACIONES:
     const updatedHabIndex = state.habitaciones.findIndex(
       (h) => h.id === action.payload.id
     );
     const updatedHabs = [...state.habitaciones];
     updatedHabs[updatedHabIndex] = action.payload;
     return {
       ...state,
       habitaciones: updatedHabs,
     };
   case PUT_HABITACIONES_DETAIL:
     const updatedHabDetIndex = state.allRooms.findIndex(
       (h) => h.id === action.payload.id
     );
     const updatedHabsDet = [...state.allRooms];
     updatedHabsDet[updatedHabDetIndex] = action.payload;
     return {
       ...state,
       allRooms: updatedHabsDet,
     };
   case GET_TIPOS_HABITACIONES:
     return {
       ...state,
       habitaciones: [...action.payload],
     };

   case PUT_TIPOS_HABITACIONES:
     const updatedTiposHabIndex = state.habitaciones.findIndex(
       (h) => h.id === action.payload.id
     );
     const updatedTiposHabs = [...state.habitaciones];
     updatedTiposHabs[updatedTiposHabIndex] = action.payload;
     return {
       ...state,
       habitaciones: updatedTiposHabs,
     };
   case PUT_USERS:
     const updatedUserIndex = state.users.findIndex(
       (u) => u.id === action.payload.id
     );
     const updatedUsers = [...state.users];
     updatedUsers[updatedUserIndex] = action.payload;
     return {
       ...state,
       users: updatedUsers,
     };
   case GET_USERS:
     return {
       ...state,
       users: [...action.payload],
     };

   case PUT_CLIENTES:
     const updatedClientIndex = state.clientes.findIndex(
       (client) => client.doc_Identidad === action.doc
     );
     // Crea una copia del array de clientes actual y reemplaza el cliente modificado en el índice correspondiente
     const updatedClientes = [...state.clientes];
     updatedClientes[updatedClientIndex] = action.payload;
     return {
       ...state,
       clientes: [...updatedClientes],
     };
   case GET_CLIENTES:
     return {
       ...state,
       clientes: [...action.payload],
     };
     case GET_RESERVAS:
     return {
       ...state,
       reservas: [...action.payload],
     };
     case PUT_RESERVAS:
     const updatedReservaIndex = state.habitaciones.findIndex(
       (h) => h.id === action.payload.id
     );
     const updatedReserva = [...state.habitaciones];
     updatedReserva[updatedReservaIndex] = action.payload;
     return {
       ...state,
       habitaciones: updatedReserva,
     };
   case SEARCH_ROOMS:
     let newRoomsSearch = [...action.payload];
     //se aplican los filtros
     newRoomsSearch = action.payload.filter((room) =>
       state.filters.every((filtroItem) =>
         room.caracteristica.includes(filtroItem)
       )
     );
     let newRoomsSearchOrder = ordenar(newRoomsSearch, state.order);

     return {
       ...state,
       rooms: [...newRoomsSearchOrder],
       allRooms: [...action.payload],
     };

   case DETAIL_ROOM:
     const rooms = [...state.allRooms];
     const room = rooms.find((r) => r.id === action.payload);
     return {
       ...state,
       room: room,
     };

   case FILTER_ROOMS:
     const roomsFilter = [...state.allRooms];
     const filter = action.payload;
     const newRooms = roomsFilter.filter((room) =>
       filter.every((filtroItem) => room.caracteristica.includes(filtroItem))
     );
     // console.log("filtro:", filter);
     // console.log("Resultado:", newRooms);
     return {
       ...state,
       rooms: [...newRooms],
       filters: [...action.payload],
     };

   case ORDER_ROOMS:
     const roomsOrder = [...state.allRooms];
     const order = action.payload;
     let newRoomsOrder = ordenar(roomsOrder, order);
     return {
       ...state,
       rooms: [...newRoomsOrder],
       order: action.payload,
     };

   case TYPES_ROOMS:
     return {
       ...state,
       typesRooms: [...action.payload],
       allTypesRooms: [...action.payload],
     };

   case FILTER_TYPES_ROOMS:
     const typesRoomsFilter = [...state.allTypesRooms];
     const filterTypes = action.payload;

     //filtramos los tipos de habitaciones donde subTipo sea igual al filterTypes
     const newTypesRooms = typesRoomsFilter.filter((room) => {
       return room.subTipo === filterTypes;
     });

     return {
       ...state,
       typesRooms: [...newTypesRooms],
     };

   case SAVE_PAGE:
     return {
       ...state,
       page: action.payload,
     };

   // ----- Authentication -----

   case UPDATE_DISPLAYNAME:
     return {
       ...state,
       auth: {
         ...state.auth,
         displayName: `${action.payload.nombre} ${action.payload.apellido}`,
       },
     };
*/
  


   default:
     return { ...state };
 }
}