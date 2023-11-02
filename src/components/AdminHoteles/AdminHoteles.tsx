import { useEffect, useState } from 'react';
import type { Hotel } from '../../types/Hotel';
import { useStore } from '../../store/allStore';

function AdminHoteles() {
  const {getHoteles} = useStore()
  //const {getHoteles,editHotel,deleteHotel,getRooms,editRoom,deleteRoom} = useStore()
  // se crea una variable de estado local del listado
  const [hotels, setHotels] = useState<Hotel[] | any>([]);
//edit hotel
/*
const [actualHotel, setActualHotel] = useState<Hotel>({
 id:0,
 hotel: '',
 country: '',
 city: '',
 address: '',
 taxes: 0
})

const [editHotelId, setEditHotelId] = useState<number>(0)
*/


  

  useEffect(() => {
   setHotels(getHoteles())   
  }, []);

  return (
    <>
      <h2>Hoteles <button className="">Nuevo Hotel</button></h2>
      {hotels.length > 0 && 
        hotels.map((hotel:any) => (
          <div key={hotel.id}>{hotel.hotel}</div>
        ))
      }

<div className='fixed z-1 top-0 bottom-0 left-0 right-0 bg-black/70  align-middle justify-center items-center hidden'>
<div className='w-10/12 md:w-6/12 lx:w-4/12 bg-white h-80 rounded-md p-4'>
/buscar para cargar todos los campos de una
</div>

</div>


    </>
  );
}

export default AdminHoteles;