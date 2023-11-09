import { useEffect, useState } from 'react';
import type { Hotel } from '../../types/Hotel';
import type { Room } from '../../types/Room';
import { useStore } from '../../store/allStore';
import React from 'react';

function AdminHoteles() {

  const {hoteles,getHoteles,newHotel,editHotel,deleteHotel,rooms,getAllRooms,newRoom,editRoom,deleteRoom} = useStore()
  //const {getHoteles,editHotel,deleteHotel,getAllRooms,editRoom,deleteRoom} = useStore()
  // se crea una variable de estado local del listado
  const [hotels, setHotels] = useState<Hotel[] | any>([]);
  const [listRooms, setListRooms] = useState<Room[] | any>([]);

//edit hotel

const [actualHotel, setActualHotel] = useState<Hotel>({
 id:0,
 hotel: '',
 country: 'Colombia',
 city: '',
 address: '',
 taxes: 0
})
const [actualRoom, setActualRoom] = useState<Room>({
  id: 0,
  room_type: '',
  room: '',
  description: '',
  price: 0,
  capacity: 0,
  hotelId: 0,
})
//const [editHotelId, setEditHotelId] = useState<number>(0)
const [showeditHotel, setShoweditHotel] = useState<boolean>(false)
const [showeditRoom, setShoweditRoom] = useState<boolean>(false)

  useEffect(() => {
    if(hoteles.length===0){
      getHoteles()
    }
   setHotels(hoteles)
   //setListRooms(rooms)  
  }, [hoteles]);

  useEffect(() => {
    if(rooms.length===0){
    getAllRooms()  
    } 
    setListRooms(rooms)       
  }, [rooms]);

  function handlerSubmitHotel(e:any){
    e.preventDefault()
    //console.log(actualHotel)
    if(actualHotel.id===0){
      newHotel(actualHotel)
    }else{
     editHotel(actualHotel) 
    }
    
    setShoweditHotel(false)
    setActualHotel({
      id:0,
      hotel: '',
      country: 'Colombia',
      city: '',
      address: '',
      taxes: 0
    })
    alert('Hotel Guardado')   
  }

  function handlerDeleteHotel(hotelID:number){
    if(confirm('Desea borrar este Hotel?')){
    deleteHotel(hotelID) 
    alert('Hotel Borrado')   
    }
    
  }

  function handlerSubmitRoom(e:any){
    e.preventDefault()
    //console.log(actualHotel)
    if(actualRoom.id===0){
      newRoom(actualRoom)
    }else{
     editRoom(actualRoom) 
    }
    
    setShoweditRoom(false)
    setActualRoom({
      id: 0,
  room_type: '',
  room: '',
  description: '',
  price: 0,
  capacity: 0,
  hotelId: 0,
    })
    alert('Habitación Guardada')   
  }

  const handleChangeHotel = (event:any) => {
    let campo = event.target.name;
    let valor = event.target.value;

    setActualHotel({ ...actualHotel, [campo]: valor });
  };
   
  const handleChangeRoom = (event:any) => {
    let campo = event.target.name;
    let valor = event.target.value;

    setActualRoom({ ...actualRoom, [campo]: valor });
  };
  
  const handleEditHotel = (position:number) => {
    setActualHotel(hotels[position])
    setShoweditHotel(true)
  }
const handleEditRoom = (room:Room) => {
    setActualRoom(room)
    setShoweditRoom(true)
  }

  function handlerDeleteRoom(roomID:number){
    if(confirm('Desea borrar esta Habitación?')){
    deleteRoom(roomID) 
    alert('Habitación Borrada')   
    }
    
  }
  return (
    <div className="text-color4 mt-10">
      <h2>Listado de Hoteles</h2> 
     
<button onClick={()=>setShoweditHotel(true)}>+ Nuevo Hotel</button>

<table className='tabla mt-4'>
<thead>
<tr>
  <th></th>
  <th>Pais</th>
  <th>Ciudad</th>
  <th>Hotel</th>
  <th>Dirección</th>
  <th>Impuesto</th>
  <th></th>
  <th></th>
  <th></th>
</tr>
</thead>
<tbody>
{hotels.length > 0 && 
        hotels.map((hotel:any, i:number) => (
          <React.Fragment key={hotel.id}>
         <tr> 
          <td>{i+1}</td>
          <td>{hotel.country}</td>
          <td>{hotel.city}</td>
          <td>{hotel.hotel}</td>
          <td>{hotel.address}</td>
          <td className='text-center'>{hotel.taxes}</td>
          <td> <button onClick={()=> handleEditHotel(i)}>Editar</button> </td>
          <td> <button className='!bg-red' onClick={()=> handlerDeleteHotel(hotel.id)}>Borrar</button> </td>
          <td>
          <button onClick={()=>{
            setActualRoom({
              id: 0,
          room_type: '',
          room: '',
          description: '',
          price: 0,
          capacity: 0,
          hotelId: hotel.id,
            })
            setShoweditRoom(true)
            }}>+ Nueva Habitación</button>
          </td>
          </tr> 
          
          <tr>
            <td></td>
            <td colSpan={7}>
              
              <table className='tabla'>
                <thead>
                  <tr>
                    <th></th>
                    <th>Tipo</th>
                    <th>Habitación</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Capacidad</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {listRooms.length > 0 && 
                        listRooms.filter((room:any) => room.hotelId === hotel.id).map((room:any, index:number) => (
                          <React.Fragment key={room.id}>
                         <tr> 
                          <td>{index+1}</td>
                          <td>{room.room_type}</td>
                          <td>{room.room}</td>
                          <td>{room.description}</td>
                          <td>{room.price}</td>
                          <td className='text-center'>{room.capacity}</td>
                          <td> <button onClick={()=> handleEditRoom(room)}>Editar Hab.</button> </td>
          <td> <button className='!bg-red' onClick={()=> handlerDeleteRoom(room.id)}>Borrar Hab.</button> </td>
                          </tr>
                          </React.Fragment>
                        ))
}
                          </tbody>
              </table>
            </td>
          </tr>
          </React.Fragment>
        ))
      }
   </tbody>   
</table>
      
      

{showeditHotel && (<div className='fixed z-1 top-0 bottom-0 left-0 right-0 bg-black/70 flex align-middle justify-center items-center '>
<div className='w-10/12 md:w-6/12 lx:w-4/12 bg-white  rounded-md p-4'>
<form onSubmit={handlerSubmitHotel}>
  <h2 className='text-primary'>{actualHotel.id==0? 'Nuevo':'Editando'} Hotel</h2>
  <div className='grid grid-cols-2 md:grid-cols-2'>
 <div>
  <div className='label'>Nombre</div>
<input type="text" name="hotel" value={actualHotel.hotel} onChange={handleChangeHotel} placeholder="nombre hotel" required />
  </div>   
  <div>
  <div className='label'>País</div>
<input type="text" name="country" value={actualHotel.country}  onChange={handleChangeHotel} placeholder="pais" required />
  </div> 
  <div>
  <div className='label'>Ciudad</div>
 <input type="text" name="city" value={actualHotel.city}  onChange={handleChangeHotel} placeholder="ciudad" required />
  </div> 
  <div>
  <div className='label'>Dirección</div>
<input type="text" name="address" value={actualHotel.address}  onChange={handleChangeHotel} placeholder="dirección" required />
  </div> 
  <div>
  <div className='label'>% impuesto</div>
<input type="number" name="taxes" value={actualHotel.taxes}  onChange={handleChangeHotel} placeholder="% impuesto" required />
  </div> 
 
  </div>

<button className='!bg-green'>Guardar</button> <button className='!bg-red' onClick={()=>setShoweditHotel(false)}>cerrar</button>
 </form>
 </div>

</div>)}


{showeditRoom && (<div className='fixed z-1 top-0 bottom-0 left-0 right-0 bg-black/70 flex align-middle justify-center items-center '>
<div className='w-10/12 md:w-6/12 lx:w-4/12 bg-white  rounded-md p-4'>
<form onSubmit={handlerSubmitRoom}>
  <h2 className='text-primary'>{actualRoom.id==0? 'Nueva':'Editando'} Habitación -   
   {hotels.find((h:any)=>h.id===actualRoom.hotelId)?.hotel}
  </h2>
  <div className='grid grid-cols-2 md:grid-cols-2'>
 <div>
  <div className='label'>Nombre Habitación</div>
<input type="text" name="room" value={actualRoom.room} onChange={handleChangeRoom} placeholder="nombre habitación" required />
  </div> 
  <div>
  <div className='label'>Tipo de Habitación</div>
<input type="text" name="room_type" value={actualRoom.room_type} onChange={handleChangeRoom} placeholder="tipo de habitación" required />
  </div>  
  <div>
  <div className='label'>Capacidad Pax</div>
<input type="number" name="capacity" value={actualRoom.capacity}  onChange={handleChangeRoom} placeholder="capacidad" required />
  </div> 
  <div>
  <div className='label'>Precio $</div>
 <input type="text" name="price" value={actualRoom.price}  onChange={handleChangeRoom} placeholder="precio" required />
  </div> 
  <div>
  <div className='label'>Descripción</div>
  <textarea name="description"  onChange={handleChangeRoom} placeholder="descripción" >{actualRoom.description}</textarea>

  </div> 
  
 
  </div>

<button className='!bg-green'>Guardar</button> <button className='!bg-red' onClick={()=>setShoweditRoom(false)}>cerrar</button>
 </form>
 </div>

</div>)}

    </div>
  );
}

export default AdminHoteles;