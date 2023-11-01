const getCookie = (name:string) => {
 const cookies = document.cookie.split(';');
 for (const cookie of cookies) {
   const [cookieName, cookieValue] = cookie.trim().split('=');
   if (cookieName === name) {
     return cookieValue;
   }
 }
 return '';
}

const deleteCookie = (name:string) => {
  const date = new Date();
  date.setTime(date.getTime() - 1); // Establecer la fecha de expiración en el pasado
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=;${expires};path=/`;
}

const saveCookie = (name:string, value:string, hours:number) => {
  const date = new Date();
  date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); ///hours
  ///date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));//days
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
 }


export {getCookie,deleteCookie,saveCookie}