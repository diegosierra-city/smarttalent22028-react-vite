import { useEffect, useState } from "react";
import axios from "axios";
import {editHotel, editRoom } from "../../redux/actions";
import type { Hotel } from "../../types/Hotel";
import type { Room } from "../../types/Room";
import { useDispatch } from "react-redux";
interface Props {
 id:number, 
 data: any, 
 type: string, 
 onClose: any
}


export default function DashDetalle({ id, data, type, onClose }: Props) {

 const [newData, setNewData] = useState<Hotel[]>([]);

 console.log("Data:.", newData);

  useEffect(() => {
   setNewData(data);
 }, [data]);

 function convertirCadena(cadena:string) {
   // Dividir la cadena en palabras separadas por mayúsculas o "_"
   const palabras = cadena.split(/_|\B(?=[A-Z])/);

   // Capitalizar la primera letra de cada palabra y unirlas con un espacio
   const resultado = palabras
     .map((palabra) => {
       return palabra.charAt(0).toUpperCase() + palabra.slice(1);
     })
     .join(" ");

   return resultado;
 }

 const handleChange = (event:any) => {
   let campo = event.target.name;
   let valor = event.target.value;

   // Convierte el valor a un booleano si es una cadena "true" o "false"
   if (valor === "true") {
     valor = true;
   } else if (valor === "false") {
     valor = false;
   }

   setNewData({ ...newData, [campo]: valor });
 };

 const dispatch = useDispatch();
 const handleSubmit = async (e:any) => {
   
   e.preventDefault();

   if (type === "hotel") {
     //alert('Cliente actualizado');
     dispatch(editHotel(newData));
   } else if (type === "users") {
     // alert('Usuario actualizado');
    // dispatch(editRoom(newData));
   } /*else if (type === "reservas") {
     //alert('Habitacion actualizado');
     dispatch(PutReservas(id, newData));
   }
   */
   onClose(false);

 };

const handleUploadPhoto =async (e:any) => {
 let file = e.target.files[0];
 console.log(file)
 const formData = new FormData();
 formData.append("photo", file);
 /*
 //
 const response = await axios.post(
   `${import.meta.env.VITE_API_URL}/hotel/imagen`,
   formData,
   {headers:{"Content-Type": "multipart/form-data"}}
 )
 if (response) {
   
   const urlImagen = await axios.get(
     `${import.meta.env.VITE_API_URL}/hotel/imagen/` + file.name
   )
   //console.log(urlImagen.data)
   if (urlImagen.data) {
    // console.log(urlImagen.data)
     //actualizamos la foto
     setNewData({ ...newData, image: urlImagen.data });
//setUrl(urlImagen.data);
//alert(urlImagen.data)
   }
 alert('Respuesta: '+response.data)  
   }
   */
 };
 return (
   <div>
     <form onSubmit={handleSubmit}>
       <div>
         <h2 className="uppercase border-b-2 mb-4 !text-primary">
           {type}
         </h2>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {Object.keys(newData).map(
             (key:any) =>
               key !== "deleted" &&
               key !== "id" &&
               key !== "createdAt" &&
               key !== "updatedAt" &&
               key !== "descripcion" &&
               key !== "caracteristica" &&
               key !== "image" &&
               key !== "Cliente" &&
               key !== "Reserva_Items" &&
               key !== "ClienteDocIdentidad" &&
               key !== "password" && (
                 <div key={key}>
                   <label htmlFor="">{convertirCadena(key)}</label>
                   <br />
                   {((key === "googleUser" || key === "doc_Identidad") &&
                     `${newData[key]}`) ||
                     ((newData[key] === true || newData[key] === false) && (
                       <div>
                         <select
                           onChange={handleChange}
                           name={key}
                           value={newData[key] ? "true" : "false"}
                           className="block text-lg w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                         >
                           <option value="true">Si</option>
                           <option value="false">No</option>
                         </select>
                       </div>
                     )) ||
                     ((key === "fechaIngreso" || key === "fechaSalida") && (
                       <input
                         type="date"
                         name={key}
                         value={newData[key]}
                         onChange={handleChange}
                         className="block text-lg w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       />
                     )) || (
                       <input type="text"
                         name={key}
                         value={newData[key]}
                         onChange={handleChange}
                       />
                       
                     )}
                 </div>
               )
           )}

           {Object.keys(newData).map(
             (key:any) =>
               ((key === "descripcion" || key === "caracteristica") && (
                 <div className="col-span-2 md:col-span-4" key={key}>
                   <label htmlFor="">{convertirCadena(key)}</label>
                   <br />

                   <textarea
                     onChange={handleChange}
                     name={key}
                     className="block w-full h-20 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                     value={newData[key]}
                   ></textarea>
                 </div>
               )) || (key === 'Cliente' && (
                 <div className="col-span-1 md:col-span-2" key={key}>
                   <label htmlFor="">{convertirCadena(key)}</label>
                   <br />
                   <div className="border p-2">
                   {Object.keys(newData[key]).map(
                   (subkey) => <div>{convertirCadena(subkey)}: {newData[key][subkey]}
                   </div>
                   
               )} </div>                  

                 </div>
                )) || (key === 'Reserva_Items' && (
                 <div className="col-span-2 md:col-span-4" key={key}>
                   <label htmlFor="">{convertirCadena(key)}</label>
                   <br />
                   <div className="p-2 grid gap-2 grid-cols-2">
                   {newData[key].map((element:any,index:number) => (
                   <div className="border p-2">{Object.keys(element)
                     .filter(subkey => subkey !== 'id')
                     .map(
                     (subkey) => <div>{convertirCadena(subkey)}: {subkey !== 'Habitacion'? JSON.stringify(element[subkey]) : (Object.keys(element[subkey]).map(
                       (subsubkey) => <div>{convertirCadena(subsubkey)}: {JSON.stringify(element[subkey][subsubkey])}</div>
                   ))}</div>
                 )}</div>
                   
                   ))
                 }
                   </div>
                                    

                 </div>
                )) ||
               (key == "image" && (
                 <div className="col-span-2 md:col-span-4" key={key}>
                   <label htmlFor="">{convertirCadena(key)}</label>
                   <br />
                   <img
                     src={newData[key]}
                     alt=""
                     className="w-10/12 max-w-[300px] h-auto mx-auto"
                   />

                   <input
                     type="file"
                     name="photo"
                     onChange={handleUploadPhoto}
                     className="block text-lg w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   />


                 </div>
               ))
           )}
         </div>

         <div className="mt-2">
           <button className="bg-secondary" onClick={() => onClose(false)}>
             Cerrar
           </button>
           <button
             type="button"
             className="ml-3 bg-primary"
            
           >
             Guardar
           </button>
         </div>
       </div>
     </form>
     
   </div>
 );
}