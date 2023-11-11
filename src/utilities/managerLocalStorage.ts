export function saveLocalStorage(key:string, value:any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key:string) {
  if(localStorage.getItem(key)){
    let val=localStorage.getItem(key)
    return val? JSON.parse(val) : null;
   }
  
}

export function removeLocalStorage(key:string) {
  localStorage.removeItem(key);
}