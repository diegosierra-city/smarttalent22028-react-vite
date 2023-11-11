//import { useState } from 'react'
import './App.css'
import Admin from "./views/Admin/Admin.js";
import Error404 from "./views/Error404/Error404";
import Home from "./views/Home/Home";
import Search from "./views/Search/Search";
import NavBar from './components/NavBar/NavBar.js';
import Footer from './components/Footer/Footer.js';
import {Routes, Route} from 'react-router-dom';
import { useLocation } from "react-router-dom";


function App() {
  //const [count, setCount] = useState(0)
  let { pathname } = useLocation();
  return (
    <div className="App">
  {pathname!='/admin' && (
    <NavBar />
  )}     
<Routes>
<Route path="/" element={<Home />} />
<Route path="/search" element={<Search />} />
{/*  
<Route path="/detail/:id" element={<Detail />} />
*/}

<Route path="/admin" element={<Admin />} />
<Route path="*" element={<Error404 />} />
</Routes>
{pathname!='/admin' && (
    <Footer />
  )}
    
    </div>
  )
}

export default App
