import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { Search } from "../../types/Search";
import { useLocation } from "react-router-dom";
import { useStore } from '../../store/allStore';
import {
  saveLocalStorage,
  getLocalStorage,
  
} from "../../utilities/managerLocalStorage";
//removeLocalStorage,
//import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const {searchBox,searchRooms} = useStore()

  let { pathname } = useLocation();
  
  const navigate = useNavigate();

  const validate = (inputs:Search) => {
    let today = new Date();
    let totalError = 0;
    let err:any = {};
alert(inputs.dateIn)
  if (!inputs.dateIn || inputs.dateIn !== null) {
    err.dateIn = "Falta la Fecha de Ingreso";
    totalError++
  }
  if (!inputs.dateOut || inputs.dateOut !== null) {
    err.dateOut = "Falta la Fecha de Salida";
    totalError++
  }
  if (inputs.dateIn && inputs.dateIn < today) {
    err.dateIn = "Fecha de Ingreso incorrecta";
    totalError++
  }
  if (inputs.dateIn && inputs.dateOut && inputs.dateIn >= inputs.dateOut) {
    err.dateOut = "Fecha de Salida incorrecta";
    totalError++
  }
  if (inputs.pax < 1) {
    err.pax = "Falta el número de personas";
    totalError++
  }
  if (inputs.city === '' ) {
    err.pax = "Falta la ciudad";
    totalError++
  }
// console.log('Errores::',err)
setErrors(err)
  return totalError;
};

  let search: Search = { dateIn: searchBox.dateIn, dateOut: searchBox.dateOut, pax: searchBox.pax, city: searchBox.city };

  const [inputs, setInputs] = useState<Search>(search);
  //console.log('IN',inputs)
  const [errors, setErrors] = useState<any>({
    dateIn: '',
    dateOut: '',
    pax: '',
    city: '',
  });

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isCheckInCalendarOpen, setIsCheckInCalendarOpen] = useState(false);
  const [isCheckOutCalendarOpen, setIsCheckOutCalendarOpen] = useState(false);

  useEffect(() => {
    const searchFromLocalStorage = getLocalStorage("search");
  
    if (searchFromLocalStorage) {
      const searchStart = searchFromLocalStorage.dateIn;
      const currentDate = new Date().toISOString().slice(0, 10);
  
      if (searchStart > currentDate) {
        // La fecha del almacenamiento local es igual o mayor que la fecha actual
        setInputs(searchFromLocalStorage);
        validate(searchFromLocalStorage);
        //
        searchRooms(searchFromLocalStorage);
      }
    }
  }, [pathname]);

  //console.log('Form',diets)

  const handleChange = (event:any) => {
    let campo = event.target.name;
    let valor = event.target.value;
    //console.log('change',campo,valor)
    setInputs({ ...inputs, [campo]: valor });
    validate({ ...inputs, [campo]: valor });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    //
    let total = validate(inputs);
    if (total !== 0) return;

    saveLocalStorage("search", inputs);
    searchRooms(inputs);
    
    if (pathname !== "/search") {
      navigate("/search");
    }
  };

  function formatDate(date:Date) {
    return date.toISOString().slice(0, 10);
  }

  return (
    <div className="absolute bottom-10 w-full flex justify-center">
      <form onSubmit={handleSubmit}>
        <div className="search-form p-2 rounded-md shadow-md text-center border bg-primary/60 md:text-left flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 lg:gap-8 md:items-end md:justify-between  align-bottom md:p-4 dark:bg-[#84550f]">
          <div className="flex flex-col">
            <label className="dark:text-white">Fecha de Ingreso:</label>
            <DatePicker
              selected={checkInDate}
              onChange={(date:any) => {
                setCheckInDate(date);
                setInputs({ ...inputs, dateIn: formatDate(date) });
              }}
              onClickOutside={() => setIsCheckInCalendarOpen(false)}
              onFocus={() => setIsCheckInCalendarOpen(true)}
              open={isCheckInCalendarOpen}
              dateFormat="dd-MM-yyyy"
              minDate={new Date()}
              className="border rounded-md"
              placeholderText="Ingreso"
              value={inputs.dateIn}
              name="dateIn"
            />
          </div>
          <div className="flex flex-col">
            <label className="dark:text-white">Fecha de Salida:</label>
            <DatePicker
              selected={checkOutDate}
              onChange={(date:any) => {
                setCheckOutDate(date);
                setInputs({ ...inputs, dateOut: formatDate(date) });
              }}
              onClickOutside={() => setIsCheckOutCalendarOpen(false)}
              onFocus={() => setIsCheckOutCalendarOpen(true)}
              open={isCheckOutCalendarOpen}
              dateFormat="dd-MM-yyyy"
              minDate={checkInDate ? new Date(checkInDate) : new Date()}
              className="border rounded-md"
              placeholderText="Salida"
              value={inputs.dateOut}
              name="dateOut"
            />
          </div>
          <div className="flex flex-col">
            <label className="dark:text-white">Adultos</label>
            <input
              type="number"
              min="1"
              value={inputs.pax}
              name="pax"
              className="border rounded-md w-14 text-center"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="dark:text-white">ciudad</label>
            <input
              type="text"
              min="0"
              value={inputs.city}
              name="niños"
              className="border rounded-md w-14 text-center"
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-customOrange text-white px-10 py-2"
            >
              Buscar
            </button>
          </div>
        </div>
        {errors.dateIn && (
          <div className="text-sm text-red-800">{errors.dateIn}</div>
        )}
        {errors.dateOut && (
          <div className="text-sm text-red-800">{errors.dateOut}</div>
        )}
        {errors.pax && (
          <div className="text-sm text-red-800">{errors.pax}</div>
        )}
      </form>
    </div>
  );
}
