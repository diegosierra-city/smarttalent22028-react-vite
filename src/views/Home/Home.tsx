import Slider from "../../components/Slider/Slider"
import SearchBox from "../../components/SearchBox/SearchBox"

function Home() {
  return (
    <div className="relative">

<Slider 
  images={[
    '/images/home01.jpg',
    '/images/home02.jpg',
    '/images/home03.jpg',
    '/images/home04.jpg'
  ]} 
/>
<SearchBox />
    </div>
  )
}

export default Home