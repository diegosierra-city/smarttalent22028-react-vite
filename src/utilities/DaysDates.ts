export function diasEntreFechas(fecha1:any, fecha2:any) {
 // Convierte las fechas de texto a objetos Date
 const date1:any = new Date(fecha1);
 const date2:any = new Date(fecha2);

 // Calcula la diferencia en milisegundos
 const diferenciaEnMilisegundos = Math.abs(date2 - date1);

 // Convierte la diferencia a días
 const diasDiferencia = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);

 return diasDiferencia;
}