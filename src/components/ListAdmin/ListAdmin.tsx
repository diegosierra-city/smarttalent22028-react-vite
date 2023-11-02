import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import axios from 'axios';

interface Hotel {
  id: number;
  name: string;
}

interface Props {
  table: string; 
}

function ListAdmin({ table }: Props) {
  // se crea una variable de estado local del listado
  const [hotels, setHotels] = useState<Hotel[]>([]);

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
    if (table === 'hoteles') {
      loadHotels();
    }
  }, [table]);

  return (
    <>
      <h2>{table} <button className="">Nuevo Registro</button></h2>
      {hotels.length > 0 && 
        hotels.map(hotel => (
          <div key={hotel.id}>{hotel.name}</div>
        ))
      }
    </>
  );
}

export default ListAdmin;