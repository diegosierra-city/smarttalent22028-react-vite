import {deleteCookie} from '../../utilities/cookie'
//import { useDispatch } from 'react-redux'
//import { logoutUser } from '../../redux/actions'
import { useState } from 'react'
import AdminHoteles from '../AdminHoteles/AdminHoteles'
import AdminReservas from '../AdminReservas/AdminReservas'


function DashBoard() {
//const dispatch = useDispatch()
// con useState creamos la variable section
  const [section, setSection] = useState('Hoteles')


function handlerClose(){
deleteCookie('user')
//dispatch(logoutUser())
}  
  return (
    <>
    <div className='text-right'>DashBoard - <button onClick={handlerClose}>salir</button></div>
    <div>
      <ul className='flex border-b border-secondary menu'>
        <li className={section==='Hoteles'? 'active' : ''} onClick={()=>setSection('Hoteles')}>Hoteles</li>
        <li className={section==='Reservas'? 'active' : ''} onClick={()=>setSection('Reservas')}>Reservas</li>
      </ul>
    </div>

    <section>
      {(section==='Hoteles' && <AdminHoteles />) || (section==='Reservas' && <AdminReservas />)}
    </section>


    </>
  )
}

export default DashBoard