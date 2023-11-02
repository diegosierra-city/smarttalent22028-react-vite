import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import axios from 'axios';
import type { Hotel } from '../../types/Hotel';


function AdminHoteles() {
  // se crea una variable de estado local del listado
  const [hotels, setHotels] = useState<Hotel[]>([]);
//edit hotel
const [editHotel, setEditHotel] = useState<Hotel>({
 id:0,
 hotel: '',
 country: '',
 city: '',
 address: '',
 taxes: 0
})

const [editHotelId, setEditHotelId] = useState<number>(0)



  const loadHotels = async () => {
    try {
      const response = await axios.get(
        'https://backend-smart-talent-22028.onrender.com/hoteles'
      );

      setHotels(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   
      loadHotels();
    
  }, []);

  return (
    <>
      <h2>Hoteles <button className="">Nuevo Hotel</button></h2>
      {hotels.length > 0 && 
        hotels.map(hotel => (
          <div key={hotel.id}>{hotel.hotel}</div>
        ))
      }

<div className='fixed z-1 top-0 bottom-0 left-0 right-0 bg-black/70 flex align-middle justify-center items-center'>
<div className='w-10/12 md:w-6/12 lx:w-4/12 bg-white h-80 rounded-md p-4'>
/buscar para cargar todos los campos de una
</div>

</div>


    </>
  );
}

export default AdminHoteles;