import { create } from 'zustand'
import type { Hotel } from '../types/Hotel'
import type { Room } from '../types/Room'
import axios from 'axios'

interface Store{
 login: boolean
 //hoteles es un array de objetos typo Hotel
 hoteles: Hotel[]
 rooms: Room[]
 loginChange: (value:boolean) => void
 getHoteles: () => void
 editHotel: (value:Hotel) => void
 newHotel: (value:Hotel) => void
 deleteHotel: (value:number) => void
 getRooms: () => void
 editRoom: (value:Room) => void
 newRoom: (value:Room) => void
 deleteRoom: (value:number) => void
}

export const useStore = create<Store>((set) => ({
  login: false,
  hoteles: [],
  rooms: [],
  //increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //removeAllBears: () => set({ bears: 0 }),
  loginChange: (value) => set(() => ({ login: value })),
  //
  getHoteles: async () => {
   try {
    const response = await axios.get(
      'https://backend-smart-talent-22028.onrender.com/hoteles'
    );
set((state) => ({ 
 ...state,
 hoteles: response.data
}));
  } catch (error) {
    return error;
  }
  },
//
editHotel: async (hotel) => {
  try {
    const response = await axios.put(
      'https://backend-smart-talent-22028.onrender.com/hotel',
      hotel
    );
    return response;
  } catch (error) {
    return error;
  }
},
newHotel: async (hotel) => {
 try {
   const response = await axios.post(
     'https://backend-smart-talent-22028.onrender.com/hotel',
     hotel
   );
   return response;
 } catch (error) {
   return error;
 }
},
deleteHotel: async (hotelId) => {
 try {
   const response = await axios.delete(
     `https://backend-smart-talent-22028.onrender.com/hotel/${hotelId}`
   );
   return response;
 } catch (error) {
   return error;
 }
},
getRooms: async () => {
 try {
  const response = await axios.get(
    'https://backend-smart-talent-22028.onrender.com/rooms'
  );
set((state) => ({ 
...state,
hoteles: response.data
}));
} catch (error) {
  return error;
}
},
editRoom: async (room) => {
 try {
   const response = await axios.put(
     'https://backend-smart-talent-22028.onrender.com/room',
     room
   );
   return response;
 } catch (error) {
   return error;
 }
},
newRoom: async (room) => {
try {
  const response = await axios.post(
    'https://backend-smart-talent-22028.onrender.com/room',
    room
  );
  return response;
} catch (error) {
  return error;
}
},
deleteRoom: async (roomId) => {
try {
  const response = await axios.delete(
    `https://backend-smart-talent-22028.onrender.com/room/${roomId}`
  );
  return response;
} catch (error) {
  return error;
}
},

}))