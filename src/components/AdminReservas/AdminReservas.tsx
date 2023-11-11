import { useEffect, useState } from 'react';
import type { Booking, BookingPax } from '../../types/Booking';
//import type { Hotel } from '../../types/Hotel';
import type { Room } from '../../types/Room';
import { useStore } from '../../store/allStore';
import React from 'react';

function AdminReservas() {

  const {listBookings,getBooking,editBooking,newBooking,hoteles,getHoteles,rooms,getAllRoomsTotal,listBookingPaxs,getBookingPaxs} = useStore()
  //const {getBookinges,editBooking,deleteBooking,getAllRooms,editRoom,deleteRoom} = useStore()
  // se crea una variable de estado local del listado
  const [bookings, setBookings] = useState<Booking[] | any>([]);
 
//edit booking

const [actualBooking, setActualBooking] = useState<Booking>({
  id: 0,
  pax: 0,
  dateIn: '',
  dateOut: '',
  price: 0,
  emergency_name: '',
  emergency_phone: '',
  active: true,
  roomId: 0,
})

//
const [showeditBooking, setShoweditBooking] = useState<boolean>(false)

let [listPax, setListPax] = useState<BookingPax[]>([])

useEffect(() => {
   getHoteles()
      getAllRoomsTotal()
    getBooking()
   //  
  }, []);

  useEffect(() => {
   setBookings(listBookings)
   //  
  }, [listBookings]);

 
  function handlerSubmitBooking(e:any){
    e.preventDefault()
    //console.log(actualBooking)
    if(actualBooking.id===0){
      newBooking(actualBooking)
    }else{
     editBooking(actualBooking) 
    }
    
    setShoweditBooking(false)
    setActualBooking({
      id: 0,
  pax: 0,
  dateIn: '',
  dateOut: '',
  price: 0,
  emergency_name: '',
  emergency_phone: '',
  active: true,
  roomId: 0,
    })
    alert('Reserva Guardada')   
  }
/*
  function handlerDeleteBooking(bookingID:number){
    if(confirm('Desea borrar esta Reserva?')){
    deleteBooking(bookingID) 
    alert('Booking Borrado')   
    }
    
  }
  */

  /*
  const handleChangeBooking = (event:any) => {
    let campo = event.target.name;
    let valor = event.target.value;

    setActualBooking({ ...actualBooking, [campo]: valor });
  };*/
  
  
  const handleEditBooking = (booking:Booking) => {
    setActualBooking(booking)
    getBookingPaxs(booking.id)
    setShoweditBooking(true)
  }

  useEffect(()=>{
setListPax(listBookingPaxs )
  },[listBookingPaxs])

  function findRoom(roomId:number,campo:string){
    let actualRoom:Room = rooms.find(r => r.id === roomId) as Room
    if(campo==='habitacion' && actualRoom){
return actualRoom?.room
    }else if(campo==='hotel' && actualRoom){
let actualHotel=hoteles.find(h => h.id === actualRoom.hotelId)
return actualHotel?.hotel
    } else if(campo==='ciudad' && actualRoom){
let actualHotel=hoteles.find(h => h.id === actualRoom.hotelId)
return actualHotel?.city
    }     
  }
 
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

  
  function formatDate(fechaSQL: Date) {
    const fecha = new Date(fechaSQL);
  const year = fecha.getUTCFullYear();
  const month = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = fecha.getUTCDate().toString().padStart(2, '0');
  const fechaFormateada = `${year}-${month}-${day}`;
  return fechaFormateada;
  }


  return (
    <div className="text-color4 mt-10">
      <h2>Listado de Reservas</h2> 
     
<button className='hidden' onClick={()=>setShoweditBooking(true)}>+ Nuevo Booking</button>

<table className='tabla mt-4'>
<thead>
<tr>
  <th></th>
  <th>Fecha</th>
  <th>Ciudad</th>
  <th>Hotel</th>
  <th>Habitacion</th>
  <th>Fecha Ingreso</th>
  <th>Fecha Salida</th>
  <th></th>
  
</tr>
</thead>
<tbody>
{bookings.length > 0 && 
        bookings.map((booking:any, i:number) => (
          <React.Fragment key={booking.id}>
         <tr> 
          <td>{i+1}</td>
          <td>{formatDate(booking.createdAt)}</td>
          <td>{findRoom(booking.roomId,'ciudad')}</td>
          <td>{findRoom(booking.roomId,'hotel')}</td>         
          <td>{findRoom(booking.roomId,'habitacion')}</td>
          <td>{booking.dateIn}</td>
          <td>{booking.dateOut}</td>
           <td> <button onClick={()=> handleEditBooking(booking)}>Abrir</button> </td>
          
          </tr> 
                    
          </React.Fragment>
        ))
      }
   </tbody>   
</table>
      
      

{showeditBooking && (<div className='fixed z-1 top-0 bottom-0 left-0 right-0 bg-black/70  overflow-y-auto'>
<div className='w-10/12 md:w-6/12 mx-auto lx:w-4/12 bg-white text-black rounded-md p-4 mt-10 mb-10 relative'>
<form onSubmit={handlerSubmitBooking}>
  <h2 className='text-primary'>Reservar</h2>
habitacion ID: {actualBooking.roomId}<br />
Fecha Ingreso: {formatDate(actualBooking.dateIn)}<br />
Fecha Salida: {formatDate(actualBooking.dateOut)}<br />
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
<input data-index={index} type="date" name="birthday" onChange={handleChangePax} value={formatDate(pax.birthday)}  placeholder="Fecha Nacimiento" required />
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
 
 

<button className='!bg-green'>Guardar</button> <button className='!bg-red' onClick={()=>setShoweditBooking(false)}>cerrar</button>
 </form>
 </div>

</div>)}




    </div>
  );
}

export default AdminReservas;