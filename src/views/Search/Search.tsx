import {
  getLocalStorage,
  
} from "../../utilities/managerLocalStorage";
import { useStore } from '../../store/allStore';
import {useEffect, useState} from 'react'
import SearchBox from "../../components/SearchBox/SearchBox";
import { FiMapPin } from "react-icons/fi";
import { diasEntreFechas } from "../../utilities/DaysDates";
import type { Booking, BookingPax } from "../../types/Booking";
import type { Search } from "../../types/Search";



function Search() {
let searchBase:Search = getLocalStorage('search') as Search
  const {listSearchHoteles,listSearchRooms,searchRooms,newBookingWeb} = useStore()
  const [showBooking,setShowBooking] = useState<boolean>(false)

  let [listPax, setListPax] = useState<BookingPax[]>([])

  useEffect(() => {
    searchRooms(searchBase)
  },[])

  const [actualBooking, setActualBooking] = useState<Booking>({
    id:0,
    pax: searchBase.pax,
  dateIn: searchBase.dateIn,
  dateOut: searchBase.dateOut,
  price: 0,
  emergency_name: '',
  emergency_phone: '',
  active: true,
  roomId: 0,
   })

   useEffect(() => {
    setActualBooking({
      id:0,
      pax: searchBase.pax,
    dateIn: searchBase.dateIn,
    dateOut: searchBase.dateOut,
    price: 0,
    emergency_name: '',
    emergency_phone: '',
    active: true,
    roomId: 0,
     })
  },[])

   const handleChange = (event:any) => {
    let campo = event.target.name;
    let valor = event.target.value;

    setActualBooking({ ...actualBooking, [campo]: valor });
  };

  const handleChangePax = (e:any) => {
    const { name, value } = e.target;
    const index = e.target.dataset.index; // obtener índice del pax
    
    const updatedPax = [...listPax]; // copiar estado actual
    
    // actualizar pax correspondiente
    updatedPax[index] = { 
      ...updatedPax[index], 
      [name]: value 
    };
    
    setListPax(updatedPax); // actualizar estado
  }

  function handlerSubmitBooking(e:any){
    e.preventDefault()
    //console.log(actualBooking)
    newBookingWeb(actualBooking,listPax)
    setShowBooking(false)
    
    alert('Reserva Creada. Gracias por elegirnos')   
  }

  async function openBooking(roomId:number, price:number){
    /// solo actualizo las propiedades de roomId y de price con setActualBooking
    await setActualBooking({
      ...actualBooking,
      roomId: roomId,
      price: price
    })
    ///
    const updateListPax = async () => {
      await setListPax([]);
      for (let i = 0; i < searchBase.pax; i++) {
        await setListPax((prevListPax) => [...prevListPax, newPax]);
      }
    };
    await updateListPax();

setShowBooking(true)
  }

  let newPax:BookingPax = {
    id: 0,
    name: '',
    last_name: '',
    birthday: '',
    genere: '',
    document_type: '',
    document_number: '',
    email: '',
    phone: '',
    active: true,
    bookingId: 0 
  }

  
  

  return (
    <div>
      
      <SearchBox />
      <div className="w-11/12 md:w-10/12 mx-auto mt-8">
<h1>Resultados de busqueda</h1>
{listSearchHoteles.length>0? (
  <div>
    
    {listSearchHoteles.map((hotel) => (
      <div className="border-b pb-2 mb-4" key={hotel.id}>
        <h2 className="text-secondary">{hotel.hotel}</h2>
        <div className="text-sm flex"><FiMapPin /> {hotel.address}</div>
        
        {listSearchRooms.length > 0 && searchBase && 
                        listSearchRooms.filter((room:any) => room.hotelId === hotel.id).map((room:any) => (
                          <div key={room.id} className="flex mb-8">
                            <div className="w-full md:w-[30%] max-w-[300px]">
                              <img src="/images/rooms/base.jpg" alt="" />
                            </div>
                            <div className="w-full md:w-[70%] p-4">
                              <h3>{room.room}</h3>
                              <small>{room.room_type} - Capacidad: {room.capacity} {room.capacity>1? 'personas' : 'persona'}</small>
                              <p>{room.description}</p>
                              <div>
                                <h3>valor: $ {room.price*(diasEntreFechas(searchBase.dateIn,searchBase.dateOut))}</h3>
                              <small>Valor por Noche: {room.price} x {diasEntreFechas(searchBase.dateIn,searchBase.dateOut)} noches</small>
                              </div>

                              <button
              type="button"
              className="bg-customOrange text-white px-10 py-2"
              onClick={() => openBooking(room.id, (room.price*(diasEntreFechas(searchBase.dateIn,searchBase.dateOut))))}
            >
              Reservar
            </button>

                            </div>
                         
                          </div>
                        ))
}
              
        

        </div>
    ))}
      
  </div>
) : 'No hay habitaciones disponibles para estas fechas'}

      </div>

      {showBooking && actualBooking && (<div className='fixed z-1 top-0 bottom-0 left-0 right-0 bg-black/70  overflow-y-auto'>
<div className='w-10/12 md:w-6/12 mx-auto lx:w-4/12 bg-white text-black rounded-md p-4 mt-10 mb-10 relative'>
<form onSubmit={handlerSubmitBooking}>
  <h2 className='text-primary'>Reservar</h2>
habitacion ID: {actualBooking.roomId}<br />
Fecha Ingreso: {actualBooking.dateIn}<br />
Fecha Salida: {actualBooking.dateOut}<br />
Cantidad Personas: {actualBooking.pax}<br />
Valor Total: $ {actualBooking.price}<br />
  <div className='grid grid-cols-1 md:grid-cols-2'>
 <div className="bg-black/20">
  <div className='label'>Contacto en caso de Emergencia:</div>
<input type="text" name="emergency_name" value={actualBooking.emergency_name} onChange={handleChange} placeholder="nombre" required />
  </div>   
  <div className="bg-black/20">
  <div className='label'>Telefono:</div>
<input type="text" name="emergency_phone" value={actualBooking.emergency_phone}  onChange={handleChange} placeholder="Telefono" required />
  </div> 
  </div>

 
  <h3>Datos Huespedes: </h3>
   <div>
{listPax.length>0 && listPax.map((pax,index) => (
  <div className='grid grid-cols-1 md:grid-cols-2 pb-2 border-b mb-4' key={index}>
    <div>  
  <div className='label'>Nombre</div>
 <input data-index={index} type="text" name="name" onChange={handleChangePax} value={pax.name}   placeholder="Nombre" required />
  </div> 
  <div>
  <div className='label'>Apellido</div>
<input data-index={index} type="text" name="last_name" onChange={handleChangePax} value={pax.last_name}  placeholder="Apellido" required />
  </div> 
<div>
  <div className='label'>Fecha Nacimiento</div>
<input data-index={index} type="date" name="birthday" onChange={handleChangePax} value={pax.birthday}  placeholder="Fecha Nacimiento" required />
  </div> 
 <div>
  <div className='label'>Genero</div>
  <select data-index={index} value={pax.genere}
              name="genere"
              className="w-28 text-center"
              onChange={handleChangePax}>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="otro">otro</option>
              </select>

  </div> 
  <div>
  <div className='label'>Tipo Documento</div>
<input data-index={index} type="text" name="document_type" onChange={handleChangePax} value={pax.document_type}  placeholder="Tipo Documento" required />
  </div>  
  <div>
  <div className='label'>Documento</div>
<input data-index={index} type="text" name="document_number" onChange={handleChangePax} value={pax.document_number}  placeholder="Documento" required />
  </div>
<div>
  <div className='label'>Email</div>
<input data-index={index} type="email" name="email" onChange={handleChangePax} value={pax.email}  placeholder="Email" required />
  </div>
 <div>
  <div className='label'>Telefono</div>
<input data-index={index} type="text" name="phone" onChange={handleChangePax} value={pax.phone}  placeholder="Telefono" required />
  </div> 
  
  </div>
))}
  
 </div>  
 
 

<button className='!bg-green'>Guardar</button> <button className='!bg-red' onClick={()=>setShowBooking(false)}>cerrar</button>
 </form>
 </div>

</div>
        
      )}
      
    </div>
  )
}

export default Search