import { Link } from "react-router-dom"

function NavBar() {
  return (
    <div className="bg-secondary text-primary p-2 pl-6">
    <Link to="/"><h1>Buscardor Hotelero</h1></Link>
     </div>
  )
}

export default NavBar