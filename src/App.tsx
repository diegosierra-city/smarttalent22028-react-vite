//import { useState } from 'react'
import './App.css'
import Admin from "./views/Admin/Admin.js";
import Error404 from "./views/Error404/Error404";
import Home from "./views/Home/Home";
import {Routes, Route} from 'react-router-dom';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className="App">
       
<Routes>
<Route path="/" element={<Home />} />
{/* <Route path="/search" element={<Search />} /> 
<Route path="/detail/:id" element={<Detail />} />
*/}

<Route path="/admin" element={<Admin />} />
<Route path="*" element={<Error404 />} />
</Routes>
{/* {pathname!='/' && <Footer />} */}
    
    </div>
  )
}

export default App
