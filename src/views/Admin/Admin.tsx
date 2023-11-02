import {getCookie} from '../../utilities/cookie'
import Login from '../../components/Login/Login'
import DashBoard from '../../components/DashBoard/DashBoard'
import { useEffect } from 'react';
import { useStore } from '../../store/allStore';
//import { shallow } from 'zustand/shallow';


function Admin() {
//let login=useStore((state) => state.login)
/*const state = useStore((state) => ({
  state.login
state.loginChange
}),shallow)*/
const {login, loginChange} = useStore()


  useEffect(() => {
   // Verifica si la cookie "user" existe
   if (getCookie('user')) {
     //console.log('La cookie "user" existe.');
     loginChange(true)
   } else {
     //console.log('La cookie "user" no existe.');
     loginChange(false)
   }
 }, [getCookie('user')]);

  return (
    <div className='w-full md:w-11/12 mx-auto'>
     {login? <DashBoard /> : <Login />}
     </div>
  )
}

export default Admin