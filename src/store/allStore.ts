import { create } from 'zustand'
import type { Hotel, City } from '../types/Hotel'
import type { Room } from '../types/Room'
import type { Search } from '../types/Search'
import type { Booking, BookingPax } from '../types/Booking'
import axios from 'axios'

interface Store{
 login: boolean
 //hoteles es un array de objetos typo Hotel
 hoteles: Hotel[]
 rooms: Room[]
 searchBox: Search
listSearchHoteles: Hotel[]
 listSearchRooms: Room[]
 cities: City[]
 listBookings: Booking[]
 listBookingPaxs: BookingPax[]

 loginChange: (value:boolean) => void
 getHoteles: () => void
 editHotel: (value:Hotel) => void
 newHotel: (value:Hotel) => void
 deleteHotel: (value:number) => void
 getRooms: (value:number) => void
 getAllRooms: () => void
 getAllRoomsTotal: () => void
 editRoom: (value:Room) => void
 newRoom: (value:Room) => void
 deleteRoom: (value:number) => void
 searchRooms: (value:Search) => void
 getCities: () => void
 newBooking: (value:Booking) => void
 newBookingWeb: (value:Booking,list:BookingPax[]) => void
 editBooking: (value:Booking) => void
 deleteBooking: (value:number) => void
 getBooking: () => void
 getBookingPaxs: (value:number) => void
}

export const useStore = create<Store>((set) => ({
  login: false,
  hoteles: [],
  rooms: [],
  cities: [],
 searchBox: {
   dateIn: '',
   dateOut: '',
   pax: 2,
   city: '',
 },
 listSearchHoteles: [],
 listSearchRooms: [],
 listBookings: [],
 listBookingPaxs: [],
  //increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //removeAllBears: () => set({ bears: 0 }),
  loginChange: (value) => set(() => ({ login: value })),
  //
  getHoteles: async () => {
   try {
    const response = await axios.get(
      'https://backend-smart-talent-22028.onrender.com/hotels'
    );
    console.log('lista hoteles',response.data.hoteles)
set((state) => ({ 
 ...state,
 hoteles: response.data.hoteles
}));
  } catch (error:any) {
    console.log('error:', error.message);
  }
  },
//
editHotel: async (hotel) => {
  try {
    const response = await axios.put(
      `https://backend-smart-talent-22028.onrender.com/hotel/${hotel.id}`,
      hotel
    );
    /// del listado de hoteles actualizamos el objeto con el mismo id de la respuesta
    set((state)=>{
      const index = state.hoteles.findIndex(h => h.id === response.data.id);
      state.hoteles[index] = response.data;
      return {...state}
    
    })
    //return response;
  } catch (error:any) {
    console.log('error:', error.message);
  }
},

newHotel: async (hotel) => {
console.log('nuevo hotel')
 try {
   const response = await axios.post(
     'https://backend-smart-talent-22028.onrender.com/hotel',
     hotel
   );
   console.log(response.data)
   set((state) => ({ 
    ...state,
    hoteles: [...state.hoteles, response.data]
    }));
 } catch (error) {
   console.log('error:',error);
 }
},

deleteHotel: async (hotelId) => {
 try {
   await axios.delete(
     `https://backend-smart-talent-22028.onrender.com/hotel/${hotelId}`
   );
   set((state)=>{
    const index = state.hoteles.findIndex(h => h.id === hotelId);
    state.hoteles.splice(index, 1);
    return {...state}
   })
 } catch (error) {
   return error;
 }
},
getRooms: async (hotelId) => {
 try {
  const response = await axios.get(
    `https://backend-smart-talent-22028.onrender.com/rooms/hotel/${hotelId}`
  );
set((state) => ({ 
...state,
rooms: response.data
}));
} catch (error:any) {
  console.log('error:', error.message);
}
},
getAllRooms: async () => {
  try {
   const response = await axios.get(
     'https://backend-smart-talent-22028.onrender.com/allrooms'
   );
 set((state) => ({ 
 ...state,
 rooms: response.data
 }));
 } catch (error:any) {
   console.log('error:', error.message);
 }
 },
 getAllRoomsTotal: async () => {
  try {
   const response = await axios.get(
     'https://backend-smart-talent-22028.onrender.com/allrooms-total'
   );
 set((state) => ({ 
 ...state,
 rooms: response.data
 }));
 } catch (error:any) {
   console.log('error:', error.message);
 }
 },
editRoom: async (room) => {
 try {
   const response = await axios.put(
     `https://backend-smart-talent-22028.onrender.com/room/${room.id}`,
     room
   );
   set((state)=>{
    const index = state.rooms.findIndex(h => h.id === response.data.id);
    state.rooms[index] = response.data;
    return {...state}
  
  })
   //return response;
 } catch (error:any) {
  console.log('error:', error.message);
 }
},
newRoom: async (room) => {
try {
  const response = await axios.post(
    'https://backend-smart-talent-22028.onrender.com/room',
    room
  );
  console.log(response.data)
   set((state) => ({ 
    ...state,
    rooms: [...state.rooms, response.data]
    }));
  //return response;
} catch (error) {
  console.log('error:',error);
}
},
deleteRoom: async (roomId) => {
try {
  await axios.delete(
    `https://backend-smart-talent-22028.onrender.com/room/${roomId}`
  );
 // al listado de rooms le quitamos el objeto cuyo id es igual a rooId
 set((state)=>{
  const index = state.rooms.findIndex(h => h.id === roomId);
  state.rooms.splice(index, 1);
  return {...state}
 })

} catch (error) {
  return error;
}
},
searchRooms: async (search) => {
  //console.log('ggg',search)
try {
  const response:any = await axios.post(
    `https://backend-smart-talent-22028.onrender.com/hotels/search`,search
  );
console.log('Buqueda',search,response)
  set((state) => ({ 
    ...state,
    searchBox: search,
    listSearchHoteles: response.data.finalHotels,
 listSearchRooms: response.data.finalRooms
    }));

} catch (error) {
  return error;
}
},
getCities: async () => {
  try {
   const response = await axios.get(
     'https://backend-smart-talent-22028.onrender.com/cities'
   );
   console.log('lista cities',response.data.cities)
set((state) => ({ 
...state,
cities: response.data.cities
}));
 } catch (error:any) {
   console.log('error:', error.message);
 }
 },

editBooking: async (booking) => {
  try {
    const response = await axios.put(
      `https://backend-smart-talent-22028.onrender.com/bookings/${booking.id}`,
      booking
    );
    /// del listado de hoteles actualizamos el objeto con el mismo id de la respuesta
    set((state)=>{
      const index = state.listBookings.findIndex(h => h.id === response.data.id);
      state.listBookings[index] = response.data;
      return {...state}
    
    })
    //return response;
  } catch (error:any) {
    console.log('error:', error.message);
  }
},

newBooking: async (booking) => {
console.log('nueva reserva')
 try {
   const response = await axios.post(
     'https://backend-smart-talent-22028.onrender.com/bookings',
     booking
   );
   console.log(response.data)
   set((state) => ({ 
    ...state,
    listBookings: [...state.listBookings, response.data]
    }));
 } catch (error) {
   console.log('error:',error);
 }
},
newBookingWeb: async (booking,listPax) => {

let dataSend = [booking,listPax]
console.log('nueva reserva:',dataSend)
 try {
   const response = await axios.post(
     'https://backend-smart-talent-22028.onrender.com/bookings',
     dataSend
   );
   console.log(response.data)
   return 'Reservación Creada. Gracias por elegirnos'
 } catch (error) {
   console.log('error:',error);
   return 'Error al crear la reserva. Intente de nuevo'
 }
},
getBooking: async () => {
  try {
   const response = await axios.get(
     'https://backend-smart-talent-22028.onrender.com/bookings'
   );
   console.log('lista reservas',response.data)
  
set((state) => ({ 
...state,
listBookings: response.data
}));

 } catch (error:any) {
   console.log('error:', error.message);
 }
 },
 deleteBooking: async (bookingId) => {
  try {
    await axios.delete(
      `https://backend-smart-talent-22028.onrender.com/hotel/${bookingId}`
    );
    set((state)=>{
     const index = state.listBookings.findIndex(h => h.id === bookingId);
     state.listBookings.splice(index, 1);
     return {...state}
    })
  } catch (error) {
    return error;
  }
 },
 getBookingPaxs: async (bookingId) => {
  try {
   const response = await axios.get(
     `https://backend-smart-talent-22028.onrender.com/bookings/${bookingId}/pax`
   );
   console.log('lista paxs',response.data)
   set((state) => ({ 
...state,
listBookingPaxs: response.data
}));
 
 } catch (error:any) {
   console.log('error:', error.message);
 }
 },
}))