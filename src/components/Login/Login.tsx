import { useState } from "react";
//import { useDispatch } from "react-redux";
//useSelector
//import { loginUser } from "../../redux/actions";
//import styles from "./Login.module.css";
import axios from "axios";
import {saveCookie} from '../../utilities/cookie'
//getCookie,deleteCookie,
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
import type { User } from "../../types/User";
import { useStore } from "../../store/allStore";


export default function Login() {
  const {login, loginChange} = useStore()
  
  let [typeForm, setTypeForm] = useState('login')

  //console.log('Form',diets)
  const validate = (inputs:User | any) => {
    let err:any ={};

    if (!inputs.email || inputs.email.length < 6) {
     err.email = "the email is missing";
   } else if (regexEmail.test(inputs.email) === false) {
     err.email = "Must be an e-mail";
   }
if (inputs.password.length < 6) {
      err.password = "the password is missing, 6 or more characters";
    }

    if(typeForm==='signup'){
     if (inputs.password.length >= 6 && inputs.password!==inputs.password2) {
      err.password2 = "Confirmation is not the same";
    }
    if (inputs.name === "") {
      err.name = "the name is missing";
    }
    }
    
    return err;
  };

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  //console.log('IN',inputs)
  const [errors, setErrors] = useState({
   name: "",
   email: "",
   password: "",
   password2: "",
  });

  const handleChange = (event:any) => {
    let campo = event.target.name;
    let valor = event.target.value;

    setInputs({ ...inputs, [campo]: valor });

    setErrors(validate({ ...inputs, [campo]: valor }));
  };

  
  const handleSubmit = async (event:any) => {
    event.preventDefault();
    const arrayDePropiedades = Object.keys(errors);
    if (arrayDePropiedades.length > 0) {
      alert("Datos incompletos");
      return;
    }
    //alert("Datos completos");

    try {
     let response = await  axios.post(`https://backend-smart-talent-22028.onrender.com/${typeForm}`,inputs)
      let data = response.data
      //console.log(`${typeForm}`,data)
      loginChange(true)
      saveCookie('user', JSON.stringify(data), 8)//8horas
      alert(`Bienvenido ${data.name}`);
      setErrors({
       name: "",
       email: "",
       password: "",
       password2: "",
      });
      setInputs({
       name: "",
       email: "",
       password: "",
       password2: "",
      });
    } catch (error:any) {
   //console.table(error)
    alert(error.response.data);
    }
  };

  
  //console.log('dietsInputs',inputs.diets)
  return (
    <div className="bg-color4 p-6 rounded-md border border-secondary shadow-lg">
      <h2>User</h2>
      <form onSubmit={handleSubmit}>
       {typeForm==='signup' && (
        <div>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={inputs.name}
          className="w-90"
          onChange={handleChange}
          placeholder="name"
        />
        {errors.name && <div className="danger">{errors.name}</div>}
        <br />
        </div>
       )}
        

        <label htmlFor="image">Email:</label>
        <br />
        <input
          type="text"
          name="email"
          value={inputs.email}
          className="w-90"
          onChange={handleChange}
          placeholder="email"
        />
        {errors.email && <div className="danger">{errors.email}</div>}
        <br />
        <label htmlFor="image">Password:</label>
        <br />
        <input
          type="password"
          name="password"
          value={inputs.password}
          className="w-90"
          onChange={handleChange}
          placeholder="password"
        />
        {errors.password && <div className="danger">{errors.password}</div>}
        <br />
        {typeForm==='signup' && (
         <div>
          <label htmlFor="image">Confirm Password:</label>
        <br />
        <input
          type="password"
          name="password2"
          value={inputs.password2}
          className="w-90"
          onChange={handleChange}
          placeholder="confirm password"
        />
        {errors.password2 && <div className="danger">{errors.password2}</div>}
        <br />
         </div>
        )}
        
        
        <br />
        {typeForm==='login'? (
         <div>
          <button type="submit" className="boton-principal">Login</button> <a href="#" onClick={()=>setTypeForm('signup')}>Sign up?</a>
         </div>
         
        ) : (
         <div>
          <button type="submit" className="boton-principal">Signup</button> <a href="#" onClick={()=>setTypeForm('login')}>Log in?</a>
         </div>
        )}
        
      </form>
    </div>
  );
}