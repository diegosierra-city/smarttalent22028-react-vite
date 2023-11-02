import {deleteCookie} from '../../utilities/cookie'
//import { useDispatch } from 'react-redux'
//import { logoutUser } from '../../redux/actions'
import { useState } from 'react'
import AdminHoteles from '../AdminHoteles/AdminHoteles'
import AdminReservas from '../AdminReservas/AdminReservas'
import { useStore } from '../../store/allStore'

function DashBoard() {
  const {loginChange} = useStore()
  const [section, setSection] = useState('Hoteles')


function handlerClose(){
deleteCookie('user')
loginChange(false)
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