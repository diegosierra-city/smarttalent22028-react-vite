import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";

function Footer() {
  return (
    <div className="fixed bottom-0 bg-color3 w-full p-2 border-t border-t-secondary flex align-middle justify-center content-center items-center gap-4 ">
     Siguenos: 
     <FiFacebook /> <FiInstagram /> <FiYoutube />
     </div>
  )
}

export default Footer