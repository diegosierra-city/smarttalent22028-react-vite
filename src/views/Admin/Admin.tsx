import {getCookie} from '../../utilities/cookie'
import Login from '../../components/Login/Login'
import DashBoard from '../../components/DashBoard/DashBoard'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, logoutUser} from '../../redux/actions'

function Admin() {

const login = useSelector((state:any)=>state.login);
const dispatch = useDispatch();

  useEffect(() => {
   // Verifica si la cookie "user" existe
   if (getCookie('user')) {
     //console.log('La cookie "user" existe.');
     dispatch(loginUser())
   } else {
     //console.log('La cookie "user" no existe.');
     dispatch(logoutUser())
   }
 }, [getCookie('user')]);

  return (
    <div>
     {login? <DashBoard /> : <Login />}
     </div>
  )
}

export default Admin